import {
  API_URL,
  delegatorAddress,
  l0_polygon,
  mintControllerAddress,
  minterAddress,
  primaryChainId,
  rpc_primary,
} from "@/constants";
import { BigNumber, Contract, Signer, ethers } from "ethers";

// Contract ABIs
import DelegatorABI from "@/json/PlutoDelegator.json";
import MintControllerABI from "@/json/PlutoMintController.json";
import MinterABI from "@/json/PlutoMinter.json";

import { preparePayment } from "./payment";
import { formatEther, parseEther } from "ethers/lib/utils.js";

export async function getMaxSupplyReached() {
  const provider = new ethers.providers.JsonRpcProvider(rpc_primary);

  const mintControllerContract = new Contract(
    mintControllerAddress,
    MintControllerABI,
    provider
  );

  const minterContract = new Contract(minterAddress, MinterABI, provider);

  const totalMinted = +formatEther(await minterContract.totalMinted());
  const maxSupply = +formatEther(await mintControllerContract.maxSupply());
  return totalMinted > maxSupply;
}

export async function getMintAllocation(signatureInfo: any, address: string) {
  const currentPhase = signatureInfo.PhaseType;
  if (!currentPhase)
    return {
      free: 0,
      paid: 0,
    };

  // Public Mint, unlimited
  if (currentPhase == 5) {
    return {
      paid: -1,
      free: -1,
    };
  }

  const provider = new ethers.providers.JsonRpcProvider(rpc_primary);
  const mintControllerContract = new Contract(
    mintControllerAddress,
    MintControllerABI,
    provider
  );

  // Not doing free mints rn
  // const freeAllowance = +formatEther(
  //   await mintControllerContract.tokensAllocated(address)
  // );

  // Paid Allowance
  const paidAllowance = signatureInfo[`Sale${signatureInfo.PhaseType}MaxMint`];
  const alreadyMinted = (
    (await mintControllerContract.readRegister(
      address,
      signatureInfo.PhaseType
    )) as BigNumber
  ).toNumber();

  const paidLeft = paidAllowance - alreadyMinted;

  return {
    free: 0,
    paid: paidLeft,
    mintedAll: paidAllowance === alreadyMinted,
  };
}

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

export async function mint(
  signer: Signer,
  chainId = 137,
  usertokensToMint?: number
) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  const signatureInfo = await (await getSignature(chainId, userAddress)).json();
  const Signature = signatureInfo.tuple;

  // Mint
  const tokensToMint =
    usertokensToMint ||
    (await getMintAllocation(signatureInfo, userAddress)).paid;
  let nativeAmount = parseEther("0");

  // Fetch token for payment, either native or ERC20
  const tokenResult = await preparePayment(tokensToMint, chainId, signer);

  if (tokenResult === null) throw new Error("Insufficient Funds");

  if (tokenResult.symbol === "NATIVE")
    nativeAmount = nativeAmount.add(
      tokenResult.mintPrice.mul(tokensToMint.toString())
    );

  if (chainId === primaryChainId) {
    // Polygon (Primary)
    const mintControllerContract = new Contract(
      mintControllerAddress,
      MintControllerABI,
      signer
    );

    return {
      result: await mintControllerContract.payAndMint(
        Signature,
        tokensToMint,
        tokenResult.address,
        ethers.constants.AddressZero,
        {
          value: nativeAmount,
        }
      ),
      tokenAddress: tokenResult.address,
    };
  } else {
    // Ethereum (Secondary)
    const delegatorContract = new Contract(
      delegatorAddress,
      DelegatorABI,
      signer
    );
    const destinationChainId = l0_polygon;
    const [estimatedFees, _] = (await delegatorContract.estimateFees(
      userAddress,
      destinationChainId,
      "1"
    )) as [BigNumber, BigNumber];

    // Add 20% buffer to estimatedFees
    nativeAmount = nativeAmount.add(
      parseEther((+formatEther(estimatedFees) * 1.2).toFixed(18))
    );

    return {
      result: await delegatorContract.payAndMintTokens(
        Signature,
        tokenResult.address,
        tokensToMint,
        userAddress,
        ethers.constants.AddressZero,
        {
          value: nativeAmount,
        }
      ),
      tokenAddress: tokenResult.address,
    };
  }
}
