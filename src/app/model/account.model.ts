export interface Operation {
  operationId: number;
  amount: number;
  operationType: string;
  operationDate: Date;
  description: string;
}

export interface Account {
  accountNumber: number;
  clientName: string;
  balance: number;
  operations: Operation[];
}
