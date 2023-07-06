import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

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
