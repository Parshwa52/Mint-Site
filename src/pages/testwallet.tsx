import ThreeJSLoading from "@/components/threeJSLoading";
import ConnectWallet from "@/components/ui/ConnectWallet";
import { primaryChainId, rpc_primary, rpc_secondary } from "@/constants";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount, useChainId } from "wagmi";

import DelegatorABI from "@/json/PlutoDelegator.json";
import MintControllerABI from "@/json/PlutoMintController.json";
import MinterABI from "@/json/PlutoMinter.json";

function Test() {
  const DelegateCashButton = dynamic(
    // @ts-ignore
    () => import("delegatecash-button-react"),
    {
      ssr: false,
    }
  );

  const { address } = useAccount();
  const chainId = useChainId();

  async function decode() {
    // Only on polygon
    const provider = new ethers.providers.JsonRpcProvider(rpc_primary);
    const receipt = await provider.getTransactionReceipt(
      "0x412c5c28bea7ab2e1982a85b6fd1218436e7c05a63633fd7a5781d661e68b09f"
    );

    const abi = MinterABI;

    console.log("Receipt", receipt);

    const iface = new ethers.utils.Interface(abi);
    const events = iface.parseLog(receipt.logs[2]);
    console.log({ events });
    console.log("ID", events.args.tokenId)
  }

  return (
    <div className="bg-white text-black min-h-screen cursor-default">
      <button onClick={decode}>Decode</button>
    </div>
  );
}

export default Test;
