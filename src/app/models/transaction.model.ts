export interface Transaction {
    amount: number;
    category?: string;
    description: string;
<<<<<<< HEAD
    budgetName?: string;
    transactionType: "Income" | "Expense";
    date: Date;
=======
    is_an_expense: 'boolean';
    time: Date;
>>>>>>> 7a8f009c72db2f0dd318f7c6b378b49f3e2ce417
}
