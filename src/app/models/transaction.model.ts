export interface Transaction {

    amount: number;
    category?: string;
    description: string;
    budgetName?: string;
    transactionType: "Income" | "Expense";
    date: Date;
}
