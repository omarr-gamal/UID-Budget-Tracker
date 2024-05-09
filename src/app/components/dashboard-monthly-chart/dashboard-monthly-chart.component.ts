import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';


interface IncomeDataPoint {
  date: string;
  income: number;
}

interface ExpenseDataPoint {
  date: string;
  expense: number;
}
@Component({
  selector: 'app-dashboard-monthly-chart',
  templateUrl: './dashboard-monthly-chart.component.html',
  styleUrls: ['./dashboard-monthly-chart.component.css']
})
export class DashboardMonthlyChartComponent implements OnInit {
  pieChartData: any;
  incomeExpenseChartData: any;
  showPieChart: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initIncomeExpenseChart();
    this.initPieChart();
  }

  initPieChart() {
    this.authService.user$.subscribe(user => {
      if (user && (user.mainWalletAmount > 0 || user.savingWalletAmount > 0)) {
        this.updatePieChartData(user.mainWalletAmount, user.savingWalletAmount);
        this.showPieChart = true;
      } else {
        this.showPieChart = false;
      }
    });
  }

  updatePieChartData(mainWalletAmount: number, savingWalletAmount: number) {
    this.pieChartData = {
      labels: ['Balance', 'Savings'],
      datasets: [{
        data: [mainWalletAmount, savingWalletAmount],
        backgroundColor: ['#42A5F5', '#9CCC65'],
        hoverBackgroundColor: ['#64B5F6', '#AED581']
      }]
    };
  }
  initIncomeExpenseChart() {
    const incomeData: IncomeDataPoint[] = [
      { date: '2021-01-01', income: 200 },
      { date: '2021-02-01', income: 450 },
      { date: '2021-03-01', income: 320 }
    ];
    const expenseData: ExpenseDataPoint[] = [
      { date: '2021-01-01', expense: 500 },
      { date: '2021-02-01', expense: 330 },
      { date: '2021-06-01', expense: 400 }
    ];

    const combinedData = this.mergeFinancialData(incomeData, expenseData);

    this.incomeExpenseChartData = {
      labels: combinedData.map(entry => entry.date),
      datasets: [
        {
          type: 'line',
          label: 'Income',
          data: combinedData.map(entry => entry.income),
          fill: false,
          borderColor: '#FFA726'
        },
        {
          type: 'line',
          label: 'Expenses',
          data: combinedData.map(entry => entry.expense),
          fill: false,
          borderColor: '#EF5350'
        }
      ]
    };
  }

  mergeFinancialData(incomeData: IncomeDataPoint[], expenseData: ExpenseDataPoint[]) {
    const dataMap = new Map();

    incomeData.forEach(item => {
      dataMap.set(item.date, { date: item.date, income: item.income, expense: 0 });
    });

    expenseData.forEach(item => {
      const data = dataMap.get(item.date) || { date: item.date, income: 0, expense: 0 };
      data.expense = item.expense;
      dataMap.set(item.date, data);
    });

    return Array.from(dataMap.values());
  }
}
