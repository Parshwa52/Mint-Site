
export * from "./uniswap";
export * from "./tokens";

// Phase timings

export const PHASE = {
  // Investor & MBC
  1: {
    startTime: 1689186600,
    endTime: 1689187500,
  },
  // Guaranteed
  3: {
    startTime: 1689187500,
    endTime: 1689188400,
  },
  // FCFS
  4: {
    startTime: 1689188400,
    endTime: 1689189300,
  },
  // Public Mint
  5: {
    startTime: 1689189300,
    endTime: 1689198800,
  },
};

// ChainIds
export const primaryChainId = 137; // Polygon Mainnet, Minter & MintController Contracts
export const secondaryChainId = 1; // Ethereum Mainnet, Delegator Contract

// Whitelist, Signature API
export const API_URL = "https://pluto-whitelist-i5isf.ondigitalocean.app";

// RPC URLs used for fetching multi-chain balances
export const rpc_ethereum =
  "https://eth-mainnet.g.alchemy.com/v2/uXqMixV-ZenaLSsJCfYVT7Gy8LRjt5C4";
export const rpc_polygon =
  "https://polygon-mainnet.g.alchemy.com/v2/n16AHrpBeF5nc3nlNxaRaSZLHeYKedUz";

// export const rpc_goerli =
//   "https://eth-goerli.g.alchemy.com/v2/p2H_3LDh1SZAiCMCNZQyFPYY7K8Kxtty";

// export const rpc_mumbai =
//   "https://polygon-mumbai.g.alchemy.com/v2/xScLHgyYFvlGKWZ5SxstjeZqLC6mDgB-";

export const rpc_primary = rpc_polygon;
export const rpc_secondary = rpc_ethereum;

// LayerZero Chain IDs
export const l0_polygon = 109; // LayerZero Polygon Mainnet

// Core Contract Addresses
export const delegatorAddress = "0x52e3a2ae070E1428cb3B9b95608812cf652Db7CA"; // Ethereum Mainnet
export const minterAddress = "0x35171Cb57488e23Ba52875adae2eE939F34117e0"; // Polygon Mainnet
export const mintControllerAddress =
  "0xfCC564A846150bD6D77982E6BF396b0b6a04DEd9"; // Polygon Mainnet

// Token Addresses
export const wethETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const wethPolygon = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";

export const fromAssetAddressNative =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; // Native Token

// Bridging Params
// export const fromChainId = 1;
// export const toChainId = 137;

// export const fromAssetAddressWETH = wethETH; // WETH Token (Ethereum Mainnet)

// export const toAssetAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"; // WETH on Polygon
// export const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
// export const sort = "output"; // "output" | "gas" | "time"
// export const singleTxOnly = true;

// // Amount to be bridged over if necessary
// const targetAmountNumber = 0.051; // In WETH
// export const targetAmount = parseUnits(targetAmountNumber.toString(), 18);

// // Mint Amount
// const mintAmountNumber = 0.05; // In WETH
// export const mintAmount = parseUnits(mintAmountNumber.toString(), 18);
