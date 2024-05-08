export interface Transaction {
  id?: string,
  name?: string;
  amount: number;
  category?: string;
  description: string;
  budgetName?: string;
  transactionType: "Income" | "Expense";
  isRecurring?: boolean;
  date: Date;
}
