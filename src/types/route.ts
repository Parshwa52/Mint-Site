export interface SocketRoute {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  usedBridgeNames: string[];
  minimumGasBalances: MinimumGasBalances;
  chainGasBalances: ChainGasBalances;
  totalUserTx: number;
  sender: string;
  recipient: string;
  totalGasFeesInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
  outputValueInUsd: number;
  userTxs: UserTx[];
  serviceTime: number;
  maxServiceTime: number;
  integratorFee: IntegratorFee;
}

export interface MinimumGasBalances {
  "1": string;
  "137": string;
}

export interface ChainGasBalances {
  "1": N1;
  "137": N137;
}

export interface N1 {
  minGasBalance: string;
  hasGasBalance: boolean;
}

export interface N137 {
  minGasBalance: string;
  hasGasBalance: boolean;
}

export interface UserTx {
  userTxType: string;
  txType: string;
  chainId: number;
  toAmount: string;
  toAsset: ToAsset;
  stepCount: number;
  routePath: string;
  sender: string;
  approvalData: ApprovalData;
  steps: Step[];
  gasFees: GasFees2;
  serviceTime: number;
  recipient: string;
  maxServiceTime: number;
  bridgeSlippage: number;
  swapSlippage: number;
  userTxIndex: number;
}

export interface ToAsset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string;
}

export interface ApprovalData {
  minimumApprovalAmount: string;
  approvalTokenAddress: string;
  allowanceTarget: string;
  owner: string;
}

export interface Step {
  type: string;
  protocol: Protocol;
  chainId?: number;
  fromAsset: FromAsset;
  fromAmount: string;
  toAsset: ToAsset2;
  toAmount: string;
  swapSlippage?: number;
  minAmountOut: string;
  gasFees: GasFees;
  fromChainId?: number;
  toChainId?: number;
  bridgeSlippage?: number;
  protocolFees?: ProtocolFees;
  serviceTime?: number;
  maxServiceTime?: number;
}

export interface Protocol {
  name: string;
  displayName: string;
  icon: string;
  securityScore?: number;
  robustnessScore?: number;
}

export interface FromAsset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId?: string;
}

export interface ToAsset2 {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId?: string;
}

export interface GasFees {
  gasAmount: string;
  gasLimit: number;
  asset: Asset;
  feesInUsd: number;
}

export interface Asset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: any;
}

export interface ProtocolFees {
  asset: Asset2;
  feesInUsd: number;
  amount: string;
}

export interface Asset2 {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string;
}

export interface GasFees2 {
  gasAmount: string;
  feesInUsd: number;
  asset: Asset3;
  gasLimit: number;
}

export interface Asset3 {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: any;
}

export interface IntegratorFee {
  amount: string;
  asset: Asset4;
}

export interface Asset4 {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string;
}
