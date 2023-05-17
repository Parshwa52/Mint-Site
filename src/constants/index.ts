import { ModalData } from "@/provider/uiProvider";
import { parseUnits } from "ethers/lib/utils.js";

// RPC URLs used for fetching multi-chain balances
export const rpc_ethereum = "https://eth.llamarpc.com";
export const rpc_polygon = "https://polygon.llamarpc.com";

// NFT Contact on Polygon
export const nftAddress = "0xf475D99Be3241c69454eA8AF7B12F38078F697bc"; // Replace later when NFT contract is deployed

// Token Addresses
export const wethETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const wethPolygon = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";

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

export const BRIDGE_LATENCY_DATA: ModalData = {
  title: "Bridging Warning",
  text: `
          Due to bridging latency, there might be a chance the
          transaction will fail. We urge you to make the transaction
          from Polygon itself to avoid this.
  `,
};
