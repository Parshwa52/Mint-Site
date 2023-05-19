import { SupportedChainId, Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";
import { parseUnits } from "ethers/lib/utils.js";

export const QUOTER_CONTRACT_ADDRESS =
  "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

export const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// Polygon //
export const WMATICToken = new Token(
  SupportedChainId.POLYGON,
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  18,
  "WMATIC",
  "Wrapped Matic"
);

export const WETHToken = new Token(
  SupportedChainId.POLYGON,
  "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  18,
  "WETH",
  "Wrapped Ether"
);

// in and out are swapped for getting the Quote from uniswap
export const tokensConfig = {
  in: WMATICToken,
  out: WETHToken,
  fee: FeeAmount.LOW,
  amountOut: parseUnits("0.0005", 18), // testing
  //   amountOut: parseUnits("0.0505", 18).toString(),
};

export const poolAddress = "0x86f1d8390222A3691C28938eC7404A1661E618e0"; // WMATIC-WETH Pool Address
