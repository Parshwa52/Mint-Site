// List of whitelisted tokens by chainId in priority order
export interface WhitelistToken {
  symbol: string;
  address: string;
}

export const tokens = {
  // Goerli
  5: [
    {
      symbol: "HILL",
      address: "0x954215ABB826AF53FA71Ff3f6CA68DB7CA1EE94a",
    },
  ],
} as Record<number, Array<WhitelistToken>>;
