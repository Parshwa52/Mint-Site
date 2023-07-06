import { ModalData } from "@/provider/uiProvider";
import { parseUnits } from "ethers/lib/utils.js";

export * from "./uniswap";

// Whitelist, Signature API
export const API_URL = "https://pluto-whitelist-5c37p.ondigitalocean.app";

// RPC URLs used for fetching multi-chain balances
export const rpc_ethereum =
  "https://eth-mainnet.g.alchemy.com/v2/uXqMixV-ZenaLSsJCfYVT7Gy8LRjt5C4";
export const rpc_polygon =
  "https://polygon-mainnet.g.alchemy.com/v2/n16AHrpBeF5nc3nlNxaRaSZLHeYKedUz";

// LayerZero Chain IDs
export const l0_ethereum = -1; // Fill in when deployed
export const l0_polygon = 10121;

// Delegator Addresses
export const delegatorAddress = "0x17909E8A36fF7D7121e4b3fd0Ea925C569209748"; // Goerli

// Minter Addresses (Not used in any way, keep until final deployment for reference)
export const minterAddress = "0xB192282B7E82C4900cc9DCE905F5cCFD224462b7"; // Mumbai

// Token Addresses
export const wethETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const wethPolygon = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";

// Bridging Params
export const fromChainId = 1;
export const toChainId = 137;

export const fromAssetAddressNative =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; // Native Token
export const fromAssetAddressWETH = wethETH; // WETH Token (Ethereum Mainnet)

export const toAssetAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"; // WETH on Polygon
export const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
export const sort = "output"; // "output" | "gas" | "time"
export const singleTxOnly = true;

// Amount to be bridged over if necessary
const targetAmountNumber = 0.051; // In WETH
export const targetAmount = parseUnits(targetAmountNumber.toString(), 18);

// Mint Amount
const mintAmountNumber = 0.05; // In WETH
export const mintAmount = parseUnits(mintAmountNumber.toString(), 18);

// Popup Modal Data
export const INSUFFICIENT_FUNDS_DATA: ModalData = {
  title: "Insufficient Funds",
  text: `You need ${mintAmountNumber} WETH on Polygon for minting. Or at least ${targetAmountNumber} WETH/ETH on Ethereum to bridge over to Polygon.`,
};
