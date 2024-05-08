import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-monthly-chart',
  templateUrl: './dashboard-monthly-chart.component.html',
  styleUrl: './dashboard-monthly-chart.component.css'
})
export class DashboardMonthlyChartComponent {
  barLineChartData: any;
  incomeExpenseChartData: any;
  ngOnInit() {
    this.initBarLineChart();
    this.initIncomeExpenseChart();
  }
  initBarLineChart() {
    this.barLineChartData = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          type: 'bar',
          label: 'Balance',
          backgroundColor: '#42A5F5',
          data: [500, 600, 800],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Savings',
          backgroundColor: '#9CCC65',
          data: [300, 400, 450]
        }
      ]
    };
  }

  initIncomeExpenseChart() {
    this.incomeExpenseChartData = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          type: 'line',
          label: 'Income',
          data: [1000, 1200, 1400],
          fill: false,
          borderColor: '#FFA726'
        },
        {
          type: 'line',
          label: 'Expenses',
          data: [800, 900, 1000],
          fill: false,
          borderColor: '#EF5350'
        }
      ]
    };
  }

}
