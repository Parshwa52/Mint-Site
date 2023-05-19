import {
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  tokensConfig,
} from "@/constants";
import { BigNumber, Signer, ethers } from "ethers";
import { rpc_polygon } from "@/constants";

import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import SwapRouterABI from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";

const providerPolygon = new ethers.providers.JsonRpcProvider(rpc_polygon);

export async function getSwapQuote() {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    providerPolygon
  );

  // In and Out are swapped here for getting the quote from uniswap
  const quotedAmountIn: BigNumber =
    await quoterContract.callStatic.quoteExactInputSingle(
      tokensConfig.out.address,
      tokensConfig.in.address,
      tokensConfig.fee,
      tokensConfig.amountOut,
      0
    );

  return {
    amountIn: quotedAmountIn,
    amountInFormatted: formatUnits(quotedAmountIn),
  };
}

export async function swap(signer: Signer) {
  const userAddress = await signer.getAddress();

  const deadline = Math.floor(Date.now() / 1000) + 60 * 120; // 2 hours from when txn signed

  // Structure:
  //   struct ExactOutputSingleParams {
  //     address tokenIn;
  //     address tokenOut;
  //     uint24 fee;
  //     address recipient;
  //     uint256 deadline;
  //     uint256 amountOut;
  //     uint256 amountInMaximum;
  //     uint160 sqrtPriceLimitX96;
  // }
  const params = {
    tokenIn: tokensConfig.in.address,
    tokenOut: tokensConfig.out.address,
    fee: tokensConfig.fee,
    recipient: userAddress,
    deadline,
    amountOut: tokensConfig.amountOut,
    amountInMaximum: parseUnits("300"), // Maximum 300 MATIC for 0.05 ETH (Practically not possible unless major price pump or dump in this time)
    sqrtPriceLimitX96: 0,
  };

  const routerContract = new ethers.Contract(
    SWAP_ROUTER_ADDRESS,
    SwapRouterABI.abi,
    providerPolygon
  );

  const data = routerContract.interface.encodeFunctionData(
    "exactOutputSingle",
    [params]
  );

  // Get required amountIn
  const { amountIn, amountInFormatted } = await getSwapQuote();

  console.log({ amountInFormatted });

  const txnArgs = {
    from: userAddress,
    to: SWAP_ROUTER_ADDRESS,
    data,
    value: amountIn,
    gasLimit: 10000,
  };

  console.log({ txnArgs });

  const { hash, wait } = await signer.sendTransaction(txnArgs);
  console.log("TXN SENT", hash);

  wait(1).then(() => {
    console.log("TRANSACTION SUCCEEDED!");
  });
}
