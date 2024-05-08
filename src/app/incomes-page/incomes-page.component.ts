import { Component } from '@angular/core';
import { MonthlyIncome } from '../models/monthly-income.model';

@Component({
  selector: 'app-incomes-page',
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.css',
})
export class IncomesPageComponent {
  dummyMonthlyIncomes: MonthlyIncome[] = [
    {
      name: 'Salary',
      description: 'Monthly salary',
      amount: 5000,
    },
    {
      name: 'Freelance Work',
      description: 'Income from freelance projects',
      amount: 1000,
    },
    {
      name: 'Investment Dividends',
      description: 'Dividends from investments',
      amount: 300,
    },
  ];
}
