import {
  API_URL,
  delegatorAddress,
  l0_polygon,
  mintControllerAddress,
  primaryChainId,
  rpc_primary,
} from "@/constants";
import { BigNumber, Contract, Signer, ethers } from "ethers";

// Contract ABIs
import DelegatorABI from "@/json/PlutoDelegator.json";
import MintControllerABI from "@/json/PlutoMintController.json";

import { preparePayment } from "./payment";
import { formatEther, parseEther } from "ethers/lib/utils.js";

export async function getMintAllocation(signatureInfo: any, address: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpc_primary);
  const mintControllerContract = new Contract(
    mintControllerAddress,
    MintControllerABI,
    provider
  );

  const freeAllowance = +formatEther(
    await mintControllerContract.tokensAllocated(address)
  );

  const paidAllowance =
    signatureInfo.Sale1MaxMint +
    signatureInfo.Sale2MaxMint +
    signatureInfo.Sale3MaxMint +
    signatureInfo.Sale4MaxMint;

  // TODO
  // const alreadyMinted = await mintControllerContract.readRegister(
  //   address,
  //   signatureInfo.PhaseType
  // );

  return {
    free: freeAllowance,
    paid: paidAllowance,
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

export async function mint(signer: Signer, chainId = 137) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  const Signature = (await (await getSignature(chainId, userAddress)).json())
    .tuple;

  // Mint
  let nativeAmount = parseEther("0");

  // Fetch token for payment, either native or ERC20
  const tokenResult = await preparePayment(chainId, signer);

  if (tokenResult === null) throw new Error("Insufficient Funds");

  if (tokenResult.symbol === "NATIVE")
    nativeAmount = nativeAmount.add(tokenResult.mintPrice);

  if (chainId === primaryChainId) {
    // Polygon (Primary)
    const minterContract = new Contract(
      mintControllerAddress,
      MintControllerABI,
      signer
    );

    console.log("Params to Minter payAndMint", {
      Signature,
      tokenAdress: tokenResult.address,
      amount: "1",
      vault: ethers.constants.AddressZero,
      value: nativeAmount,
    });
    return await minterContract.payAndMint(
      Signature,
      "1",
      tokenResult.address,
      ethers.constants.AddressZero,
      {
        value: nativeAmount,
      }
    );
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

    console.log("Params to Delegator payAndMintTokens", {
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
        value: nativeAmount,
      }
    );
  }
}
