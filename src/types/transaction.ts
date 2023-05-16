export interface TransactionData {
  userTxType: string;
  txType: string;
  txData: string;
  txTarget: string;
  chainId: number;
  userTxIndex: number;
  value: string;
  approvalData: ApprovalData;
}

interface ApprovalData {
  minimumApprovalAmount: string;
  allowanceTarget: string;
}
