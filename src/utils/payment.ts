import { BigNumber, Contract, Signer, ethers } from "ethers";

import DelegatorABI from "@/json/PlutoDelegator.json";
import MintControllerABI from "@/json/PlutoMintController.json";
import TokenABI from "@/json/WETH.json";

import {
  WhitelistToken,
  delegatorAddress,
  fromAssetAddressNative,
  mintControllerAddress,
  primaryChainId,
  rpc_primary,
  rpc_secondary,
  tokens,
} from "@/constants";
import { formatEther, parseEther } from "ethers/lib/utils.js";

/**
 * Approve an ERC20 token for NFT Delegator/Minter Contract on Polygon
 */
export async function approveToken(
  tokenAddress: string,
  minAmount: BigNumber,
  chainId: number,
  signer: Signer
) {
  const tokenContract = new Contract(tokenAddress, TokenABI, signer);

  const targetAddress =
    chainId === primaryChainId ? mintControllerAddress : delegatorAddress;

  const allowance: BigNumber = await tokenContract.allowance(
    await signer.getAddress(),
    targetAddress
  );

  // If allowance is lower than mint amount, approve more WETH
  if (allowance.lt(minAmount)) {
    const result = await tokenContract.approve(
      targetAddress,
      ethers.constants.MaxUint256
    );
    await result.wait(1);
  }
}

/**
 * Loop through all ERC20 token balances and check if user has sufficient balance in any of them.
 * The Native Token has the least priority and will be checked if user has none of these tokens.
 */
export function getPaymentToken(
  tokensToMint: number,
  userAddress: string,
  chainId: number
): Promise<(WhitelistToken & { mintPrice: BigNumber }) | null> {
  const provider = new ethers.providers.JsonRpcProvider(
    chainId === primaryChainId ? rpc_primary : rpc_secondary
  );

  return new Promise(async (resolve) => {
    for (const item of tokens[chainId]) {
      const tokenContract = new Contract(item.address, TokenABI, provider);

      const balance = (await tokenContract.balanceOf(userAddress)) as BigNumber;

      // Get mint amount for this token from appropriate contract
      const mintContract = new Contract(
        chainId === primaryChainId ? mintControllerAddress : delegatorAddress,
        chainId === primaryChainId ? MintControllerABI : DelegatorABI,
        provider
      );

      const mintPrice = (await mintContract.mintPrice(
        item.address
      )) as BigNumber;

      const finalMintPrice = mintPrice.mul(tokensToMint.toString());

      if (balance.gte(finalMintPrice)) {
        resolve({ ...item, mintPrice: finalMintPrice });
        break;
      }
    }

    // If function reached here, then balance wasn't sufficient in any of them
    resolve(null);
  });
}

/**
 * Main Function
 * Prepare to mint with:
 * 1) Native Token (first priority)
 * 2) Whitelisted Tokens in priority order while checking and asking for allowance
 */
export async function preparePayment(
  tokensToMint: number,
  chainId: number,
  signer: Signer
) {
  const userAddress = await signer.getAddress();

  const provider = new ethers.providers.JsonRpcProvider(
    chainId === primaryChainId ? rpc_primary : rpc_secondary
  );

  // Pay with Native token

  // Get Mint Price for Native token
  const mintControllerContract = new Contract(
    chainId === primaryChainId ? mintControllerAddress : delegatorAddress,
    chainId === primaryChainId ? MintControllerABI : DelegatorABI,
    provider
  );

  const mintPrice = (await mintControllerContract.mintPrice(
    fromAssetAddressNative
  )) as BigNumber;

  // Check user's native token balance
  const nativeBalance = await provider.getBalance(userAddress);

  // Check if user's native balance is at least 5% more
  const mintPriceWithMargin = parseEther(
    (+formatEther(mintPrice) * 1.05).toString()
  );

  if (nativeBalance.gte(mintPriceWithMargin)) {
    return {
      address: fromAssetAddressNative,
      symbol: "NATIVE",
      mintPrice,
      nativeBalance,
    };
  } else {
    // Check if user can pay with any ERC20 token
    const token = await getPaymentToken(tokensToMint, userAddress, chainId);

    // Pay with ERC20 token
    if (token !== null) {
      // Check Approval
      await approveToken(
        token.address,
        token.mintPrice.mul(tokensToMint.toString()),
        chainId,
        signer
      );

      return { token, nativeBalance };
    } else return null;
  }
}
