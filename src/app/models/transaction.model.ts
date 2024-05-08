export interface Transaction {
    name?: string;
    amount: number;
    category?: string;
    description: string;
    budgetName?: string;
    transactionType: "Income" | "Expense";
    isRecurring?: boolean;
    date: Date;
}
