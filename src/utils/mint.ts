import {
  API_URL,
  delegatorAddress,
  l0_ethereum,
  l0_polygon,
  primaryChainId,
} from "@/constants";
import { BigNumber, Contract, Signer, ethers } from "ethers";

// NFT Contract ABI
import DelegatorABI from "@/json/PlutoDelegator.json";
import { preparePayment } from "./payment";
import { formatEther, parseEther } from "ethers/lib/utils.js";

export async function getSignature(chainId: number, address: string) {
  // TODO: Check delegatecash vault if connected
  // TODO: Change from Goerli to Ethereum ChainId on deployment
  return await fetch(
    API_URL +
      `/rest/whitelist/${
        chainId === primaryChainId ? "poly" : "eth"
      }?walletAddress=${address}`
  );
}

export async function mint(signer: Signer, chainId = 137) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  const Signature = (await (await getSignature(chainId, userAddress)).json())
    .tuple;

  // Mint
  const delegatorContract = new Contract(
    delegatorAddress,
    DelegatorABI,
    signer
  );
  const destinationChainId =
    chainId === primaryChainId ? l0_ethereum : l0_polygon;

  const [estimatedFees, _] = (await delegatorContract.estimateFees(
    userAddress,
    destinationChainId,
    "1"
  )) as [BigNumber, BigNumber];

  // Fetch token for payment, either native or ERC20
  const tokenResult = await preparePayment(chainId, signer);

  if (tokenResult === null) throw new Error("Insufficient Funds");

  // Add 20% buffer to estimatedFees
  let nativeAmount = parseEther(
    (+formatEther(estimatedFees) * 1.20).toFixed(18)
  );

  if (tokenResult.symbol === "NATIVE")
    nativeAmount = nativeAmount.add(tokenResult.mintPrice);

  console.log({
    estimatedFees,
    mintPrice: tokenResult.mintPrice,
    nativeAmount,
  });

  console.log("Params to payAndMintTokens", {
    Signature,
    tokenAdress: tokenResult.address,
    amount: "1",
    userAddress,
    vault: ethers.constants.AddressZero,
    value: nativeAmount,
  });
 
  return await delegatorContract.payAndMintTokens(
    Signature,
    tokenResult.address,
    "1",
    userAddress,
    ethers.constants.AddressZero,
    {
      // TODO: Mint Value will depend on how the user is paying. With native tokens or ERC20 tokens
      value: nativeAmount,
    }
  );
}
