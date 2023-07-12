// import { mintAmount, targetAmount } from "@/constants";
// import {
//   approveWETHForNFT,
//   bridgeFromETHToPolygon,
//   getBalances,
// } from "@/utils/socketBridge";
// import { getSwapQuote, swap } from "@/utils/swap";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Signer } from "ethers";
// import React from "react";
// import { useChainId, useSigner, useSwitchNetwork } from "wagmi";

// type Props = {};

// function Socket({}: Props) {
//   const chainId = useChainId();
//   const signer = useSigner();
//   const switchNetwork = useSwitchNetwork();

//   async function bridge() {
//     if (!signer.data) {
//       console.warn("No wallet connected");
//       return;
//     }

//     console.log(
//       "Starting to bridge with user",
//       await signer.data?.getAddress()
//     );

//     const { ethereumBalance, wethBalanceETH, wethBalancePolygon } =
//       await getBalances(signer.data as Signer);

//     try {
//       //////////////////////////////////////
//       // Case 1: User Has WETH on Polygon //
//       //////////////////////////////////////
//       if (wethBalancePolygon.gte(mintAmount)) {
//         // Make sure network is Polygon
//         if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

//         // @ts-ignore
//         if (chainId !== 137) {
//           console.warn("Switch to Polygon Chain");
//           return;
//         }

//         // Approve WETH on Polygon to NFT Contract
//         // Mint
//         console.log("Mint call reached");
//       }

//       ///////////////////////////////////////////////
//       // Case 2: User has WETH on Ethereum Network //
//       ///////////////////////////////////////////////
//       else if (wethBalanceETH.gte(targetAmount)) {
//         // Make sure network is Ethereum
//         if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(1);

//         if (chainId !== 1) {
//           console.warn("Switch to Ethereum Chain");
//           return;
//         }

//         // Bridge WETH to Polygon
//         await bridgeFromETHToPolygon(signer.data as Signer, false);

//         // Switch to Polygon
//         if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

//         // @ts-ignore
//         if (chainId !== 137) {
//           console.warn("Switch to Polygon Chain");
//           return;
//         }

//         // Approve WETH on Polygon to NFT Contract
//         // Mint
//         console.log("Mint call reached");
//       }

//       //////////////////////////////////////////////
//       // Case 3: User has ETH on Ethereum Network //
//       //////////////////////////////////////////////
//       else if (ethereumBalance.gte(targetAmount)) {
//         // Make sure network is Ethereum
//         if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(1);

//         if (chainId !== 1) {
//           console.warn("Switch to Ethereum Chain");
//           return;
//         }

//         // Bridge Native ETH to Polygon
//         await bridgeFromETHToPolygon(signer.data as Signer, true);

//         // Switch to Polygon
//         if (switchNetwork.switchNetwork) switchNetwork.switchNetwork(137);

//         // @ts-ignore
//         if (chainId !== 137) {
//           console.warn("Switch to Polygon Chain");
//           return;
//         }

//         // Approve WETH on Polygon to NFT Contract
//         // Mint
//         console.log("Mint call reached");
//       }

//       /////////////////////////////////////////
//       // Case 4: User has insufficient funds //
//       /////////////////////////////////////////
//       else {
//         console.warn("Not enough funds on Polygon or Ethereum ");
//       }

//       console.log("Bridge and Mint Process Done");
//     } catch (e) {
//       console.error(
//         "Error during bridge and mint process. Possible that user rejected txn",
//         e
//       );
//     }
//   }

//   function checkAllowance() {
//     approveWETHForNFT(signer.data as Signer);
//   }

//   return (
//     <section className="p-10 min-h-screen bg-white text-black cursor-default">
//       <ConnectButton />
//       <button
//         className="m-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//         onClick={() => bridge()}
//       >
//         Click to bridge
//       </button>

//       <button
//         className="m-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//         onClick={() => checkAllowance()}
//       >
//         Check allowance
//       </button>

//       <hr />

//       <h1>Uniswap</h1>

//       <button
//         className="m-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//         onClick={() => getSwapQuote()}
//       >
//         Get Uniswap Quote
//       </button>

//       <button
//         className="m-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//         onClick={() => swap(signer.data as Signer)}
//       >
//         Swap
//       </button>
//     </section>
//   );
// }

// export default Socket;
