import { SocketRoute } from "@/types";

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
