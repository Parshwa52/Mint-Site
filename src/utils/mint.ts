import { API_URL, delegatorAddress, fromAssetAddressNative } from "@/constants";
import { BigNumber, Contract, Signer, ethers } from "ethers";

// NFT Contract ABI
import DelegatorABI from "@/json/PlutoDelegator.json";
import { parseEther } from "ethers/lib/utils.js";

export async function getSignature(chainId: number, address: string) {
  // TODO: Check delegatecash vault if connected
  // TODO: Change from Goerli to Ethereum ChainId on deployment
  return await fetch(
    API_URL +
      `/rest/whitelist/${
        chainId === 5 ? "eth" : "poly"
      }?walletAddress=${address}`
  );
}

export async function mint(signer: Signer, chainId = 137) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  // Construct EIP-712 Signature
  // const domain = {
  //   name: "PlutoSigner",
  //   version: "1",
  //   chainId: chainId.toString(),
  //   verifyingContract: delegatorAddress,
  // };

  // const types = {
  //   Signature: [
  //     { name: "timestamp", type: "uint32" },
  //     { name: "userAddress", type: "address" },
  //   ],
  // };

  // const value = {
  //   timestamp: Math.round(Date.now() / 1000).toString(),
  //   userAddress: userAddress,
  // };

  // // @ts-ignore
  // const signedBytes = await signer._signTypedData(domain, types, value);

  // const Signature = [value.timestamp, userAddress, signedBytes];

  const Signature = await getSignature(chainId, userAddress);

  // Mint
  const delegatorContract = new Contract(
    delegatorAddress,
    DelegatorABI,
    signer
  );
  
  const [estimatedFees, _] = (await delegatorContract.estimateFees(
    userAddress,
    chainId,
    "1"
  )) as [BigNumber, BigNumber];

  console.log("Params to payAndMintTokens", {
    Signature,
    fromAssetAddressNative,
    amount: "1",
    userAddress,
    vault: ethers.constants.AddressZero,
    value: estimatedFees.add(parseEther("0.02")),
  });
  return await delegatorContract.payAndMintTokens(
    Signature,
    fromAssetAddressNative,
    "1",
    userAddress,
    ethers.constants.AddressZero,
    {
      // TODO: Mint Value will depend on how the user is paying. With native tokens or ERC20 tokens
      value: estimatedFees.add(parseEther("0.02")),
    }
  );
}
