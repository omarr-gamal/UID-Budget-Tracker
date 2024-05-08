import { Component, OnInit } from '@angular/core';
import { MonthlyIncome } from '../../models/monthly-income.model';
import { UserIncomesService } from '../../services/user-incomes.service';

@Component({
  selector: 'app-incomes-page',
  templateUrl: './incomes-page.component.html',
  styleUrl: './incomes-page.component.css',
  providers: [UserIncomesService],
})
export class IncomesPageComponent implements OnInit {
  monthlyIncomes: MonthlyIncome[] = [];

  constructor(private userIncomesService: UserIncomesService) {
    console.log('IncomesPageComponent created');
  }

  ngOnInit() {
    console.log('Fetching incomes');
    this.userIncomesService.getAllMonthlyIncomes().subscribe(
      (incomes) => {
        if (incomes.length > 0) this.monthlyIncomes = incomes;
        else console.log('No incomes found');
      },
      (error) => {
        console.log('Error fetching incomes: ', error);
      }
    );
  }

  // dummyMonthlyIncomes: MonthlyIncome[] = [
  //   {
  //     name: 'Salary',
  //     description: 'Monthly salary',
  //     amount: 5000,
  //     category: 'Job',
  //     startDate: new Date('2024-01-01'),
  //     endDate: new Date('2024-12-31'),
  //   },
  //   {
  //     name: 'Freelance Work',
  //     description:
  //       'Income from freelance projects many words here to test because I am too lazy to do it right, is it working?',
  //     amount: 1000,
  //     category: 'Freelance',
  //     startDate: new Date('2024-01-01'),
  //     endDate: new Date('2024-12-31'),
  //   },
  //   {
  //     name: 'Investment Dividends',
  //     description: 'Dividends from investments',
  //     amount: 300,
  //     category: 'Investment',
  //     startDate: new Date('2024-01-01'),
  //     endDate: new Date('2024-12-31'),
  //   },
  //   {
  //     name: 'Freelance Work',
  //     description: 'Income from freelance projects',
  //     amount: 1000,
  //     category: 'Freelance',
  //     startDate: new Date('2024-01-01'),
  //     endDate: new Date('2024-12-31'),
  //   },
  // ];
}
