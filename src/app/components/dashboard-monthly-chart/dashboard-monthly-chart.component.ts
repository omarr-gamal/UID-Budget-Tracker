import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard-monthly-chart',
  templateUrl: './dashboard-monthly-chart.component.html',
  styleUrls: ['./dashboard-monthly-chart.component.css']
})
export class DashboardMonthlyChartComponent implements OnInit {
  pieChartData: any;
  incomeExpenseChartData: any;
  showPieChart: boolean = false;  // Controls visibility of the pie chart

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
