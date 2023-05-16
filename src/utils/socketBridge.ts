import { BigNumber, Contract, Signer, ethers } from "ethers";
import {
  checkAllowance,
  getApprovalTransactionData,
  getBridgeStatus,
  getQuote,
  getRouteTransactionData,
} from "./socket";
import {
  fromAssetAddressNative,
  fromAssetAddressWETH,
  fromChainId,
  mintAmount,
  nftAddress,
  rpc_ethereum,
  rpc_polygon,
  singleTxOnly,
  sort,
  targetAmount,
  toAssetAddress,
  toChainId,
  uniqueRoutesPerBridge,
  wethETH,
  wethPolygon,
} from "@/constants";
import { SocketRoute, TransactionData } from "@/types";
import { formatUnits } from "ethers/lib/utils.js";
import wethABI from "@/json/WETH.json";

/**
 * Bridge a fixed amount of ETH (0.051 ETH) from Ethereum to Polygon
 */
export async function bridgeFromETHToPolygon(signer: Signer, isNative = true) {
  return new Promise(async (resolve, reject) => {
    if (!signer.provider) {
      console.error("Could not find provider on signer");
      return;
    }

    try {
      console.group("Bridge from ETH to Polygon");

      // Base variables
      const amount = targetAmount;
      const userAddress = await signer.getAddress();
      const fromAssetAddress = isNative
        ? fromAssetAddressNative
        : fromAssetAddressWETH;

      console.log("Base Variables", { amount, userAddress, fromAssetAddress });

      // Get Quote for getting the bridging routes
      const quote = await getQuote(
        fromChainId,
        fromAssetAddress,
        toChainId,
        toAssetAddress,
        amount,
        userAddress,
        uniqueRoutesPerBridge,
        sort,
        singleTxOnly
      );

      // Select the first route (most optimal)
      const route = quote.result.routes[0] as SocketRoute;

      console.log("Route", route);

      // Get Txn Data
      const apiReturnData = await getRouteTransactionData(route);
      const txnData = apiReturnData.result as TransactionData;

      console.log("TxnData", txnData);

      const approvalData = txnData.approvalData;

      // If not a native token but an ERC20 token (WETH) that requires approval, get that first
      if (approvalData !== null) {
        const { allowanceTarget, minimumApprovalAmount } = approvalData;
        // Fetches token allowance given to Socket contracts
        const allowanceCheckStatus = await checkAllowance(
          fromChainId,
          userAddress,
          allowanceTarget,
          fromAssetAddress
        );
        const allowanceValue = allowanceCheckStatus.result?.value;

        // If Socket contracts don't have sufficient allowance
        if (minimumApprovalAmount > allowanceValue) {
          // Approval tx data fetched
          const approvalTransactionData = await getApprovalTransactionData(
            fromChainId,
            userAddress,
            allowanceTarget,
            fromAssetAddress,
            amount.toString()
          );

          const gasPrice = await signer.getGasPrice();

          const gasEstimate = await signer.estimateGas({
            from: userAddress,
            to: approvalTransactionData.result?.to,
            value: "0x00",
            data: approvalTransactionData.result?.data,
            gasPrice: gasPrice,
          });

          const tx = await signer.sendTransaction({
            from: approvalTransactionData.result?.from,
            to: approvalTransactionData.result?.to,
            value: "0x00",
            data: approvalTransactionData.result?.data,
            gasPrice: gasPrice,
            gasLimit: gasEstimate,
          });

          // Initiates approval transaction on user's frontend which user has to sign
          const receipt = await tx.wait();

          console.log("Approval Transaction Hash :", receipt.transactionHash);
        }
      }

      // Estimate Gas
      const gasPrice = await signer.getGasPrice();
      const gasEstimate = await signer.provider.estimateGas({
        from: userAddress,
        to: txnData.txTarget,
        value: txnData.value,
        data: txnData.txData,
        gasPrice: gasPrice,
      });

      console.log("Gas Estimates", { gasPrice, gasEstimate });

      // Send Bridging Transaction
      const txn = await signer.sendTransaction({
        from: await signer.getAddress(),
        to: apiReturnData.result.txTarget,
        data: apiReturnData.result.txData,
        value: apiReturnData.result.value,
        gasPrice: gasPrice,
        gasLimit: gasEstimate,
      });

      console.log("Transaction", txn);

      // Initiates swap/bridge transaction on user's frontend which user has to sign
      const receipt = await txn.wait();

      const txnHash = receipt.transactionHash;

      console.log("Bridging Transaction Hash: ", txnHash);

      console.groupEnd();

      // Checks status of transaction every 5 secs
      const txStatus = setInterval(async () => {
        const status = await getBridgeStatus(txnHash, fromChainId, toChainId);

        console.log(
          `SOURCE TX : ${status.result.sourceTxStatus}\nDEST TX : ${status.result.destinationTxStatus}`
        );

        if (status.result.destinationTxStatus == "COMPLETED") {
          console.log(
            "DEST TX HASH :",
            status.result.destinationTransactionHash
          );
          clearInterval(txStatus);

          resolve("OK");

          // Now ask user to switch chain to Polygon if not done already
          // Then execute WETH Approval on Polygon and after that, Mint NFT
        }
      }, 5000);
    } catch (e) {
      console.error("An error occured during bridging", e);
      reject(e);
    }
  });
}

/**
 * Get the necessary balances for checking bridging & minting conditions
 */
export async function getBalances(signer: Signer) {
  const userAddress = await signer.getAddress();

  // Set up providers for each chain
  const providerEthereum = new ethers.providers.JsonRpcProvider(rpc_ethereum);
  const providerPolygon = new ethers.providers.JsonRpcProvider(rpc_polygon);

  // WETH Contract on Ethereum
  const wethContractETH = new Contract(wethETH, wethABI, providerEthereum);

  // WETH Contract on Polygon
  const wethContractPolygon = new Contract(
    wethPolygon,
    wethABI,
    providerPolygon
  );

  // Fetch balances
  const [ethereumBalance, wethBalanceETH, wethBalancePolygon]: BigNumber[] =
    await Promise.all([
      providerEthereum.getBalance(userAddress),
      wethContractETH.balanceOf(userAddress),
      wethContractPolygon.balanceOf(userAddress),
    ]);

  // Format Balances
  const ethereumBalanceFormatted = formatUnits(ethereumBalance);
  const wethBalanceETHFormatted = formatUnits(wethBalanceETH);
  const wethBalancePolygonFormatted = formatUnits(wethBalancePolygon);

  console.log({
    ethereumBalanceFormatted,
    wethBalanceETHFormatted,
    wethBalancePolygonFormatted,
  });

  return {
    // Raw Balances
    ethereumBalance,
    wethBalanceETH,
    wethBalancePolygon,

    // Formatted
    ethereumBalanceFormatted,
    wethBalanceETHFormatted,
    wethBalancePolygonFormatted,
  };
}

/**
 * Approve WETH for NFT Contract on Polygon
 */
export async function approveWETHForNFT(signer: Signer) {
  const wethContract = new Contract(wethPolygon, wethABI, signer);

  // Check if at least "mintAmount" is allowed
  const allowance: BigNumber = await wethContract.allowance(
    await signer.getAddress(),
    nftAddress
  );

  // If allowance is lower than mint amount, approve more WETH
  if (!allowance.gte(mintAmount)) {
    await wethContract.approve(nftAddress, ethers.constants.MaxUint256);
  }
}
