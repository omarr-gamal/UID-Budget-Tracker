import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

interface Expense {
  id: number;
  name: string;
  date: string;  // using ISO string format for simplicity
  category: string;
  amount: number;
  recurring: boolean;
}

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent {
  @ViewChild('dt') dt!: Table;

  expenses: Expense[] = [
    { id: 1, date: '2023-05-01', category: 'Food', name: 'Lunch at cafe', amount: 15.00, recurring: false },
    { id: 2, date: '2023-05-02', category: 'Transport', name: 'Taxi fare', amount: 20.50, recurring: true },
    { id: 3, date: '2023-05-03', category: 'Utilities', name: 'Electricity bill', amount: 30.75, recurring: false },
    { id: 4, date: '2023-05-04', category: 'Entertainment', name: 'Movie tickets', amount: 45.00, recurring: true },
    { id: 5, date: '2023-05-05', category: 'Healthcare', name: 'Medicine', amount: 25.30, recurring: false },
    { id: 6, date: '2023-05-06', category: 'Groceries', name: 'Supermarket Shopping', amount: 60.00, recurring: false },
    { id: 7, date: '2023-05-07', category: 'Education', name: 'Books for School', amount: 75.00, recurring: false },
    { id: 8, date: '2023-05-08', category: 'Pet Care', name: 'Dog Food', amount: 35.00, recurring: true },
    { id: 9, date: '2023-05-09', category: 'Travel', name: 'Train Ticket', amount: 15.50, recurring: false },
    { id: 10, date: '2023-05-10', category: 'Miscellaneous', name: 'Gift', amount: 50.00, recurring: false },
    // Adding 23 more expenses
    { id: 11, date: '2023-05-11', category: 'Restaurants', name: 'Dinner Out', amount: 50.00, recurring: false },
    { id: 12, date: '2023-05-12', category: 'Fuel', name: 'Gas Refill', amount: 40.00, recurring: true },
    { id: 13, date: '2023-05-13', category: 'Clothing', name: 'Jacket Purchase', amount: 90.00, recurring: false },
    { id: 14, date: '2023-05-14', category: 'Electronics', name: 'Smartphone', amount: 999.00, recurring: false },
    { id: 15, date: '2023-05-15', category: 'Fitness', name: 'Gym Membership', amount: 25.00, recurring: true },
    { id: 16, date: '2023-05-16', category: 'Healthcare', name: 'Doctor Visit', amount: 120.00, recurring: false },
    { id: 17, date: '2023-05-17', category: 'Entertainment', name: 'Concert Tickets', amount: 150.00, recurring: false },
    { id: 18, date: '2023-05-18', category: 'Travel', name: 'Airline Tickets', amount: 300.00, recurring: false },
    { id: 19, date: '2023-05-19', category: 'Education', name: 'Online Course', amount: 200.00, recurring: false },
    { id: 20, date: '2023-05-20', category: 'Gift', name: 'Wedding Present', amount: 100.00, recurring: false },
    { id: 21, date: '2023-05-21', category: 'Pet Care', name: 'Veterinary Checkup', amount: 85.00, recurring: false },
    { id: 22, date: '2023-05-22', category: 'Groceries', name: 'Weekly Shopping', amount: 55.00, recurring: true },
    { id: 23, date: '2023-05-23', category: 'Beauty', name: 'Haircut', amount: 30.00, recurring: false },
    { id: 24, date: '2023-05-24', category: 'Transport', name: 'Bus Pass', amount: 60.00, recurring: true },
    { id: 25, date: '2023-05-25', category: 'Food', name: 'Pizza Night', amount: 25.00, recurring: false },
    { id: 26, date: '2023-05-26', category: 'Utilities', name: 'Water Bill', amount: 70.00, recurring: false },
    { id: 27, date: '2023-05-27', category: 'Household', name: 'Furniture Purchase', amount: 250.00, recurring: false },
    { id: 28, date: '2023-05-28', category: 'Miscellaneous', name: 'Misc Supplies', amount: 45.00, recurring: false },
    { id: 29, date: '2023-05-29', category: 'Entertainment', name: 'Streaming Service Subscription', amount: 15.00, recurring: true },
    { id: 30, date: '2023-05-30', category: 'Education', name: 'Book Purchase', amount: 20.00, recurring: false },
    { id: 31, date: '2023-05-31', category: 'Healthcare', name: 'Prescription Refill', amount: 10.00, recurring: true }
  ];
  selectedExpenses: Expense[] = [];
  showAddExpenseModal: boolean = false;
  newExpense: Expense = { id: 0, name: '', date: '', category: '', amount: 0, recurring: false };
  expenseCategories = [
    { name: "Rent" },
    { name: "Utilities" },
    { name: "Groceries" },
    { name: "Transportation" },
    { name: "HealthCare" },
    { name: "Entertainment" },
    { name: "Clothing" },
    { name: "Education" },
    { name: "Miscellaneous" }
  ];


  get reversedExpenses(): Expense[] {
    return this.expenses.slice().reverse();
  }
  openAddExpenseModal() {
    // Logic to open a modal to add an expense
    this.showAddExpenseModal = true;
  }
  addExpense(): void {
    const newId = this.expenses.length + 1;
    const expenseToAdd = { ...this.newExpense, id: newId };
    this.expenses.push(expenseToAdd);
    this.showAddExpenseModal = false;
    this.newExpense = { id: 0, name: '', date: '', category: '', amount: 0, recurring: false };
  }



  deleteSelectedExpenses() {
    if (this.selectedExpenses.length > 0) {
      const idsToRemove = new Set(this.selectedExpenses.map(exp => exp.id));
      this.expenses = this.expenses.filter(expense => !idsToRemove.has(expense.id));
      this.selectedExpenses = [];  // Clear selection after deletion
      console.log('Selected expenses deleted');
    }
  }



  editExpense(expense: Expense) {
    if (expense) {
      // Logic to edit an existing expense
    }
  }

  deleteExpense(expense: Expense) {
    if (expense) {
      this.expenses = this.expenses.filter(exp => exp.id !== expense.id);
      console.log(`Expense with ID: ${expense.id} deleted`);
    }
  }
  filterGlobal(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }

}
