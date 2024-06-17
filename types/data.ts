export interface Transaction {
  time: string;
  value: number;
}

export interface Account {
  transactions: Transaction[];
}

export interface Inflation {
  year: number;
  inflation: number;
}
