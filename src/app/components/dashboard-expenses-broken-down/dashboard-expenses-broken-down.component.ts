import { Component, OnInit } from '@angular/core';
import { UserTransactionsService } from '../../services/user-transactions.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard-expenses-broken-down',
  templateUrl: './dashboard-expenses-broken-down.component.html',
  styleUrls: ['./dashboard-expenses-broken-down.component.css']
})
export class DashboardExpensesBrokenDownComponent implements OnInit {
  data: any;
  expenses: Transaction[] = [];
  totalExpenses: number = 0;
  expenseCategories: any[] = [];  // Add this to store categories

  constructor(private userTransactionsService: UserTransactionsService) { }

  ngOnInit() {
    this.expenseCategories = this.userTransactionsService.getExpenseCategories();  // Fetch categories
    this.userTransactionsService.getExpenseTransactions().subscribe({
      next: (expenses: Transaction[]) => {
        this.expenses = expenses;
        this.totalExpenses = expenses.reduce((sum, current) => sum + current.amount, 0);
        this.expenses = this.expenses.map(expense => ({
          ...expense,
          percentage: ((expense.amount / this.totalExpenses) * 100).toFixed(2) + '%'
        }));
        this.updateChartData();
      },
      error: error => console.error('Error fetching expense transactions:', error)
    });
  }

  updateChartData() {
    this.data = {
      labels: this.expenses.map(expense => expense.category),
      datasets: [{
        data: this.expenses.map(expense => expense.amount),
        backgroundColor: this.expenses.map(expense => this.getColor(expense.category!)),
        hoverBackgroundColor: this.expenses.map(expense => this.getHoverColor(expense.category!))
      }]
    };
  }

  getColor(category: string): string {
    const categoryColor = this.expenseCategories.find(cat => cat.name === category)?.color;
    return categoryColor || '#ccc';  // if color undefined
  }


  getHoverColor(category: string): string {
    return this.getColor(category) + 'cc';
  }
}
