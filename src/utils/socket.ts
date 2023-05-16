import { SocketRoute } from "@/types";
import { ethers } from "ethers";

// const API_KEY = "645b2c8c-5825-4930-baf3-d9b997fcd88c"; // Socket Public API Key
const API_KEY = "dfac2639-bcdc-49fb-a7b6-c71c2a3a40b3"; // Custom API Key

// Makes a GET request to Socket APIs for quote
export async function getQuote(
  fromChainId: number,
  fromTokenAddress: string,
  toChainId: number,
  toTokenAddress: string,
  fromAmount: any,
  userAddress: string,
  uniqueRoutesPerBridge: boolean,
  sort: "output" | "gas" | "time",
  singleTxOnly: boolean
) {
  const response = await fetch(
    `https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}`,
    {
      method: "GET",
      headers: {
        "API-KEY": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
}

// Makes a POST request to Socket APIs for swap/bridge transaction data
export async function getRouteTransactionData(route: SocketRoute) {
  const response = await fetch("https://api.socket.tech/v2/build-tx", {
    method: "POST",
    headers: {
      "API-KEY": API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ route }),
  });

  const json = await response.json();
  return json;
}

// GET request to check token allowance given to allowanceTarget by owner
export async function checkAllowance(
  chainId: number,
  owner: string,
  allowanceTarget: string,
  tokenAddress: string
) {
  const response = await fetch(
    `https://api.socket.tech/v2/approval/check-allowance?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}`,
    {
      method: "GET",
      headers: {
        "API-KEY": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
}

// Fetches transaction data for token approval
export async function getApprovalTransactionData(
  chainId: number,
  owner: string,
  allowanceTarget: string,
  tokenAddress: string,
  amount: string | number
) {
  const response = await fetch(
    `https://api.socket.tech/v2/approval/build-tx?chainID=${chainId}&owner=${owner}&allowanceTarget=${allowanceTarget}&tokenAddress=${tokenAddress}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "API-KEY": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
}

// Fetches status of the bridging transaction
export async function getBridgeStatus(
  transactionHash: string,
  fromChainId: number,
  toChainId: number
) {
  const response = await fetch(
    `https://api.socket.tech/v2/bridge-status?transactionHash=${transactionHash}&fromChainId=${fromChainId}&toChainId=${toChainId}`,
    {
      method: "GET",
      headers: {
        "API-KEY": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  return json;
}

// Main function
async function main() {
  // Uses web3 wallet in browser as provider
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);

  // Stores signer
  const signer = provider.getSigner();

  // Bridging Params fetched from users
  const fromChainId = 137;
  const toChainId = 56;
  const fromAssetAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const toAssetAddress = "0x55d398326f99059fF775485246999027B3197955";
  const amount = 100000000; // 100 USDC, USDC is 6 decimals
  const userAddress = "0x3e8cB4bd04d81498aB4b94a392c334F5328b237b";
  const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
  const sort = "output"; // "output" | "gas" | "time"
  const singleTxOnly = true;

  // Quote for bridging 100 USDC on Polygon to USDT on BSC
  // For single transaction bridging, mark singleTxOnly flag as true in query params
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

  // Choosing first route from the returned route results
  const route = quote.result.routes[0];

  // Fetching transaction data for swap/bridge tx
  const apiReturnData = await getRouteTransactionData(route);

  // Used to check for ERC-20 approvals
  const approvalData = apiReturnData.result.approvalData;
  const { allowanceTarget, minimumApprovalAmount } = approvalData;

  // approvalData from apiReturnData is null for native tokens
  // Values are returned for ERC20 tokens but token allowance needs to be checked
  if (approvalData !== null) {
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
        amount
      );

      const gasPrice = await signer.getGasPrice();

      const gasEstimate = await provider.estimateGas({
        from: await signer.getAddress(),
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

  const gasPrice = await signer.getGasPrice();

  const gasEstimate = await provider.estimateGas({
    from: await signer.getAddress(),
    to: apiReturnData.result.txTarget,
    value: apiReturnData.result.value,
    data: apiReturnData.result.txData,
    gasPrice: gasPrice,
  });

  const tx = await signer.sendTransaction({
    from: await signer.getAddress(),
    to: apiReturnData.result.txTarget,
    data: apiReturnData.result.txData,
    value: apiReturnData.result.value,
    gasPrice: gasPrice.mul("1.1"),
    gasLimit: gasEstimate.mul("1.1"),
  });

  // Initiates swap/bridge transaction on user's frontend which user has to sign
  const receipt = await tx.wait();

  const txHash = receipt.transactionHash;

  console.log("Bridging Transaction : ", receipt.transactionHash);

  // Checks status of transaction every 20 secs
  const txStatus = setInterval(async () => {
    const status = await getBridgeStatus(txHash, fromChainId, toChainId);

    console.log(
      `SOURCE TX : ${status.result.sourceTxStatus}\nDEST TX : ${status.result.destinationTxStatus}`
    );

    if (status.result.destinationTxStatus == "COMPLETED") {
      console.log("DEST TX HASH :", status.result.destinationTransactionHash);
      clearInterval(txStatus);
    }
  }, 20000);
}
