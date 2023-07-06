import ThreeJSLoading from "@/components/threeJSLoading";
import ConnectWallet from "@/components/ui/ConnectWallet";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";

function test() {
  const DelegateCashButton = dynamic(
    // @ts-ignore
    () => import("delegatecash-button-react"),
    {
      ssr: false,
    }
  );

  const { address } = useAccount();

  return (
    <div className="bg-white text-black min-h-screen cursor-default">
      {/* <ConnectWallet /> */}
      {/* <ThreeJSLoading /> */}
      {address}
      <DelegateCashButton
        connectedWallet={address}
        rpcUrl="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        rounded={true}
        theme="dark"
        onButtonClick={(event: any) => console.log(event.detail)}
        onWalletSelect={(event: any) => console.log(event.detail)}
      />
    </div>
  );
}

export default test;
