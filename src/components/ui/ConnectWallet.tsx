import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

import dynamic from "next/dynamic";
import { rpc_ethereum, rpc_polygon } from "@/constants";

// @ts-ignore
const DelegateCashButton = dynamic(() => import("delegatecash-button-react"), {
  ssr: false,
});

function ConnectWallet(): JSX.Element {
  return (
    <div>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
    </div>
  );
}

export default ConnectWallet;
