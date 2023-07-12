export interface WhitelistToken {
  symbol: string;
  address: string;
}

// List of whitelisted tokens by chainId in priority order
export const tokens = {
  // Goerli Testnet
  5: [
    {
      symbol: "HILL",
      address: "0x954215ABB826AF53FA71Ff3f6CA68DB7CA1EE94a",
    },
  ],
  // Mumbai Testnet
  80001: [],
  1: [
    {
      symbol: "MATIC",
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    },
    {
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
  ],
  137: [],// matic, poly eth, usdc
} as Record<number, Array<WhitelistToken>>;
