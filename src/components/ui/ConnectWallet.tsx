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
      {/* <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      /> */}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          if (!connected) {
            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                })}
              >
                <button
                  className={`auth-button`}
                  onClick={() => openConnectModal()}
                >
                  Connect
                </button>
              </div>
            );
          }

          if (chain.unsupported) {
            openChainModal();
          }

          return (
            <DelegateCashButton
              rpcUrl={[rpc_ethereum, rpc_polygon]}
              onButtonClick={(event: any) => console.log(event.detail)}
              onWalletSelect={(event: any) => console.log(event.detail)}
            >
              Connect
            </DelegateCashButton>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

export default ConnectWallet;
