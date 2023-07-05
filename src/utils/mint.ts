import { delegatorAddress, fromAssetAddressNative } from "@/constants";
import { Contract, Signer, ethers } from "ethers";

// NFT Contract ABI
import DelegatorABI from "@/json/PlutoDelegator.json";
import { parseEther } from "ethers/lib/utils.js";

export async function mint(signer: Signer, chainId = 137) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  // Construct EIP-712 Signature
  const domain = {
    name: "PlutoSigner",
    version: "1",
    chainId: chainId.toString(),
    verifyingContract: delegatorAddress,
  };

  const types = {
    Signature: [
      { name: "timestamp", type: "uint32" },
      { name: "userAddress", type: "address" },
    ],
  };

  const value = {
    timestamp: Math.round(Date.now() / 1000).toString(),
    userAddress: userAddress,
  };

  // @ts-ignore
  const signedBytes = await signer._signTypedData(domain, types, value);

  const Signature = [value.timestamp, userAddress, signedBytes];

  // Mint
  const delegatorContract = new Contract(delegatorAddress, DelegatorABI, signer);
  console.log("Params to payAndMintTokens", {
    Signature,
    fromAssetAddressNative,
    amount: "1",
    userAddress,
    vault: ethers.constants.AddressZero,
  });
  return await delegatorContract.payAndMintTokens(
    Signature,
    fromAssetAddressNative,
    "1",
    userAddress,
    ethers.constants.AddressZero,
    {
      value: parseEther("0.2"),
    }
  ); // Signature, to, amount
}
