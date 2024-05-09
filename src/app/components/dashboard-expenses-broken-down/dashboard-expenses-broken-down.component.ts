import { Component, OnInit } from '@angular/core';
import { UserTransactionsService } from '../../services/user-transactions.service';
import { UserExpensesService } from '../../services/user-expenses.service';
import { Transaction } from '../../models/transaction.model'; // Assuming this model exists
import { MonthlyExpense } from '../../models/monthly-expense.model'; // Assuming this model exists

@Component({
  selector: 'app-dashboard-expenses-broken-down',
  templateUrl: './dashboard-expenses-broken-down.component.html',
  styleUrls: ['./dashboard-expenses-broken-down.component.css']
})
export class DashboardExpensesBrokenDownComponent implements OnInit {
  data: any;
  expenses: Transaction[] = [];
  totalExpenses: number = 0;
  expenseCategories: any[] = [];

  constructor(
    private userTransactionsService: UserTransactionsService,
    private userExpensesService: UserExpensesService
  ) { }

  ngOnInit() {
    this.expenseCategories = this.userTransactionsService.getExpenseCategories();
    this.fetchTransactionsAndExpenses();
  }

  fetchTransactionsAndExpenses() {
    this.userTransactionsService.getExpenseTransactions().subscribe({
      next: (expenses: Transaction[]) => {
        this.expenses = expenses;
        this.fetchMonthlyExpenses();
      },
      error: error => console.error('Error fetching expense transactions:', error)
    });
  }

  fetchMonthlyExpenses() {
    this.userExpensesService.getAllMonthlyExpenses().subscribe({
      next: (monthlyExpenses: MonthlyExpense[]) => {
        this.mergeExpensesAndCalculate(monthlyExpenses);
      },
      error: error => console.error('Error fetching monthly expenses:', error)
    });
  }

  mergeExpensesAndCalculate(monthlyExpenses: MonthlyExpense[]) {
    const monthlyExpenseAsTransactions: Transaction[] = monthlyExpenses.map(me => ({
      id: me.id ?? '',
      name: me.name ?? 'Unnamed',
      description: me.description ?? 'no description',
      amount: me.amount ?? 0,
      date: new Date(),
      category: 'Monthly Expenses',
      isRecurring: true,
      transactionType: 'Expense'
    }));

    // Merge and update chart
    this.expenses = [...this.expenses, ...monthlyExpenseAsTransactions];
    this.updateChartData();
  }

  updateChartData() {
    this.data = {
      labels: this.expenses.map(expense => expense.category),
      datasets: [{
        data: this.expenses.map(expense => expense.amount),
        backgroundColor: this.expenses.map(expense => this.getColor(expense.category ?? 'no category')),
        hoverBackgroundColor: this.expenses.map(expense => this.getHoverColor(expense.category ?? 'no category'))
      }]
    };
  }

  getColor(category: string): string {
    const categoryColor = this.expenseCategories.find(cat => cat.name === category)?.color;
    return categoryColor || '#ccc';
  }

  getHoverColor(category: string): string {
    return this.getColor(category) + 'cc'; // Make hover color slightly transparent
  }
}
