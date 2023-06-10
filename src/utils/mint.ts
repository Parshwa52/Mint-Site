import { nftAddress } from "@/constants";
import { Contract, Signer } from "ethers";

// PlutoAvatar ABI
import PlutoAvatarABI from "@/json/PlutoAvatar.json";

export async function mint(signer: Signer) {
  if (!signer.provider) {
    console.error("Could not find provider on signer");
    return;
  }

  const userAddress = await signer.getAddress();

  // Construct EIP-712 Signature
  const domain = {
    name: "PlutoSigner",
    version: "1",
    chainId: "137",
    verifyingContract: nftAddress,
  };

  const types = {
    Signature: [
      { name: "nonce", type: "uint32" },
      { name: "userAddress", type: "address" },
    ],
  };

  const value = {
    nonce: Date.now().toString(),
    userAddress: userAddress,
  };

  // @ts-ignore
  const signedBytes = await signer._signTypedData(domain, types, value);

  const Signature = [
    await signer.getTransactionCount(),
    userAddress,
    signedBytes,
  ];

  // Mint
  const nftContract = new Contract(nftAddress, PlutoAvatarABI, signer);
  await nftContract.mint(Signature, userAddress, "1"); // Signature, to, amount
}
