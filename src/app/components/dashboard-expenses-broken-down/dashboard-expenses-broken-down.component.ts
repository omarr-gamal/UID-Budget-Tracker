import { Component, OnInit } from '@angular/core';

interface Expense {
  category: string;
  amount: number;
  percentage?: string;
}

@Component({
  selector: 'app-dashboard-expenses-broken-down',
  templateUrl: './dashboard-expenses-broken-down.component.html',
  styleUrls: ['./dashboard-expenses-broken-down.component.css']
})
export class DashboardExpensesBrokenDownComponent implements OnInit {
  data: any;
  expenses: Expense[] = [
    { category: 'Food', amount: 120 },
    { category: 'Utilities', amount: 80 },
    { category: 'Rent', amount: 900 },
    { category: 'Transportation', amount: 50 }
  ];
  totalExpenses: number = 0;

  ngOnInit() {
    this.totalExpenses = this.expenses.reduce((sum, current) => sum + current.amount, 0);
    this.expenses = this.expenses.map(expense => ({
      ...expense,
      percentage: ((expense.amount / this.totalExpenses) * 100).toFixed(2) + '%'
    }));
    this.updateChartData();
  }

  updateChartData() {
    this.data = {
      labels: this.expenses.map(expense => expense.category),
      datasets: [{
        data: this.expenses.map(expense => expense.amount),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
        ],
        hoverBackgroundColor: [
          "cyan"
        ]
      }]
    };
  }

  getColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Food': '#FF6384',
      'Utilities': '#36A2EB',
      'Rent': '#FFCE56',
      'Transportation': '#4BC0C0'
    };
    return colors[category] || '#ccc';
  }
}
