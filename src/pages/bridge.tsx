import React from 'react'

type Props = {}

function bridge({}: Props) {
  return (
    <div>bridge</div>
  )
}

export default bridge



// import React, { useState } from "react";
// import { Hyphen, RESPONSE_CODES } from "@biconomy/hyphen";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { configureChains, useAccount } from "wagmi";
// import { fetchBalance } from "@wagmi/core";
// import { provider } from "@/utils/rainbowkitconfig";

// function Bridge() {
//   const [loading, setLoading] = useState(false);
//   const { address: userWalletAddress } = useAccount();

//   const hyphen = new Hyphen(window.ethereum, {
//     debug: true, 
//     environment: "test", // It can be "test" or "prod"
//     onFundsTransfered: (data) => {
//       console.log("transferred funds sucessfully");
//     },
//   });

//   const bridgeEthToMatic = async (): Promise<void> => {
//     if (!userWalletAddress) {
//       return;
//     }

//     const wEthBalance = await fetchBalance({
//       address: userWalletAddress,
//       chainId: 137,
//       token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
//     });

//     console.log(wEthBalance.formatted >= "0.005320430994549297");

//     await hyphen.init();

//     let preTransferStatus = await hyphen.depositManager.preDepositStatus({
//       tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
//       amount: "5000000000",
//       fromChainId: 1,
//       toChainId: 137,
//       userAddress: userWalletAddress
//     });
//     setLoading(true);

//     console.log(preTransferStatus);

//     if (preTransferStatus.code === RESPONSE_CODES.ALLOWANCE_NOT_GIVEN) {
//       let approveTx = await hyphen.tokens.approveERC20(
//         "tokenAddress",
//         "liquity contract address",
//         "009e09",
//         "5000000000",
//         true,
//         false
//       );
//       approveTx?.wait(1);
//     }

//     if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_NETWORK) {
//       console.log("UNSUPPORTED_NETWORK");
//     }
//     if (preTransferStatus.code === RESPONSE_CODES.NO_LIQUIDITY) {
//       console.log("NO_LIQUIDITY No liquidity please transfer funds");
//     }
//     if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_TOKEN) {
//       console.log("the token is not supported")
//     }

//     if (preTransferStatus.code === RESPONSE_CODES.OK) {
//       let depositTx = await hyphen.depositManager.deposit({
//         sender: `${userWalletAddress}`,
//         receiver: `${userWalletAddress}`,
//         tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
//         depositContractAddress: "0xE61d38cC9B3eF1d223b177090f3FD02b0B3412e7",
//         amount: "50000000000000000",
//         fromChainId: "1",
//         toChainId: "137",
//         useBiconomy: false,
//         tag: "Pluto Eth Bridge",
//         dAppName: "Plutoverse",
//       });

//       const txHash = `https://goerli.etherscan.io/tx/${depositTx?.hash}`;
//       console.log(txHash);
//       depositTx?.wait();
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={() => bridgeEthToMatic()}
//         className="px-[20px] py-[10px] bg-white"
//       >
//         check balance
//       </button>
//     </div>
//   );
// }

// export default Bridge;
