import { parseUnits } from "ethers/lib/utils.js";

// NFT Contact on Polygon
export const nftAddress = "0xf475D99Be3241c69454eA8AF7B12F38078F697bc"; // Replace later when NFT contract is deployed

// Token Addresses
export const wethETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const wethPolygon = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"; // Real

// Bridging Params
export const fromChainId = 1;
export const toChainId = 137;

export const fromAssetAddressNative =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; // Native Token (Ethereum Mainnet)
export const fromAssetAddressWETH = wethETH; // WETH Token (Ethereum Mainnet)

export const toAssetAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"; // WETH on Polygon
export const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
export const sort = "output"; // "output" | "gas" | "time"
export const singleTxOnly = true;

// Amount to be bridged over if necessary

export const targetAmount = parseUnits("0.051", 18);
// export const targetAmount = parseUnits("0.001", 18); // For TESTING if flow works, modal pops up, change later to value 0.051

// Mint Amount
export const mintAmount = parseUnits("0.05", 18);
