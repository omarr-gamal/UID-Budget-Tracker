import { UserTransactionsService } from './../../services/user-transactions.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Transaction } from '../../models/transaction.model';
import { Observable, Subscription } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

interface Expense {
  id: number;
  name: string;
  date: string;  // using ISO string format for simplicity
  category: string;
  amount: number;
  recurring: boolean;
}
interface NewExpense {
  id: number;
  name: string;
  date: Date;  // using ISO string format for simplicity
  category: number;
  amount: number;
  recurring: boolean;
}
@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  transactions: Transaction[] = [];
  expenses: Expense[] = [];
  transactionSubscription: Subscription | undefined;
  selectedDate: Date = new Date();
  allFilled: boolean = true;

  constructor(private transactionService: UserTransactionsService) { }
  ngOnInit() {
    this.transactions = []
    this.expenses = []
    this.getTransactions();
    console.log(this.transactions)
  }
  ngOnDestroy() {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }
  expenseCategories = [
    { id: 1, name: "Rent" },
    { id: 2, name: "Utilities" },
    { id: 3, name: "Groceries" },
    { id: 4, name: "Transportation" },
    { id: 5, name: "HealthCare" },
    { id: 6, name: "Entertainment" },
    { id: 7, name: "Clothing" },
    { id: 8, name: "Education" },
    { id: 9, name: "Miscellaneous" }
  ];
  getTransactions() {
    this.transactionSubscription = this.transactionService.getAllTransactions()
      .subscribe({
        next: (transactions: Transaction[]) => {
          this.transactions = transactions.filter(transaction => transaction.transactionType === "Expense");
        },
        error: (error) => {
          console.error('Error fetching transactions:', error);
        }
      });
    this.transactions.forEach(transaction => {
      console.log(transaction);
    });
  }
  newTransaction: Transaction = { id: '', name: '', date: new Date(), category: '', amount: 0, isRecurring: false, description: '', transactionType: "Expense" };
  addNewTransaction() {
    if (this.newTransaction.name && this.newTransaction.date && this.newTransaction.category && this.newTransaction.amount) {
      this.allFilled = true;
      this.newTransaction.category = this.expenseCategories[Number(this.newTransaction.category) - 1].name;
      this.transactionService.addTransaction(this.newTransaction).subscribe(
        () => {
          this.showAddExpenseModal = false;
          this.newTransaction = { id: '', name: '', date: new Date(), category: '', amount: 0, isRecurring: false, description: '', transactionType: "Expense" };
          this.getTransactions();
        },
        (error) => {
          console.error('Error adding transaction:', error);
        }
      );
    } else {
      this.allFilled = false;
    }

  }
  filterGlobal(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }
  //TODO: Revise later not working
  filterDate(event: any) {
    if (this.selectedDate instanceof Date) {
      const selectedYear = this.selectedDate.getFullYear();
      const selectedMonth = this.selectedDate.getMonth() + 1;

      // Construct the start and end dates for the selected month
      const startDate = new Date(selectedYear, selectedMonth - 1, 1); // Month in JavaScript Date starts from 0
      const endDate = new Date(selectedYear, selectedMonth, 0); // Last day of the selected month

      // Apply filter to the 'date' column of the table
      if (this.dt) {
        // Filter transactions within the selected month
        this.dt.filter(
          (transactionDate: Timestamp) => {
            const date = transactionDate.toDate();
            return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
          },
          'date',
          'custom'
        );
      } else {
        console.error("DataTable instance not found.");
      }
    } else {
      console.error("Invalid date format.");
    }
  }

  onClearDate() {
    if (this.dt) {
      this.dt.clear();
    }
  }
  deleteTransaction(transaction: Transaction) {
    console.log("here");
    // Check if transaction.id is defined before accessing it
    if (transaction.id !== undefined && transaction.id !== null) {
      const transactionId = transaction.id;

      // Call deleteTransaction with the transaction ID
      this.transactionService.deleteTransaction(transactionId).subscribe({
        next: () => {
          console.log('Transaction deleted successfully.');
          // Refresh transactions after deletion
          this.getTransactions();
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    } else {
      console.error('Transaction ID is undefined or null.');
    }
  }


  formatDate(inputDate: Date): string {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    console.log(`${day}-${month}-${year}`)
    return `${day}-${month}-${year}`;
  }
  selectedTransactions: Transaction[] = [];
  selectedExpenses: Expense[] = [];
  showAddExpenseModal: boolean = false;
  showEditExpenseModal: boolean = false;
  newExpense: NewExpense = { id: 0, name: '', date: new Date(), category: 0, amount: 0, recurring: false };
  selectedExpense: Expense = { id: 0, name: '', date: '', category: '', amount: 0, recurring: false };



  get reversedExpenses(): Expense[] {
    return this.expenses.slice().reverse();
  }
  openAddExpenseModal() {
    this.showAddExpenseModal = true;
  }
  openEditExpenseModal() {
    this.showEditExpenseModal = true;
  }



  deleteSelectedTransactions() {
    if (this.selectedTransactions.length > 0) {
      this.selectedTransactions.forEach(transaction => {
        this.deleteTransaction(transaction);
      });
    } else {
      console.log("No transactions selected.");
    }
  }




  editExpense(expense: Expense) {
    this.selectedExpense = { ...expense }; // Create a copy of the selected expense
    this.showEditExpenseModal = true; // Open the edit modal

  }
  saveExpense() {
    if (this.selectedExpense) {
      // Find the index of the selected expense in the expenses array
      const index = this.expenses.findIndex(expense => expense.id === this.selectedExpense!.id);
      if (index !== -1) {
        // Update the expense in the expenses array
        this.expenses[index] = { ...this.selectedExpense };
        console.log('Expense updated:', this.selectedExpense);
      }
    }
    this.showEditExpenseModal = false; // Close the edit modal  }
  }


}
