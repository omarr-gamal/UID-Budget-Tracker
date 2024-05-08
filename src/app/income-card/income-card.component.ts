import { Component, ViewEncapsulation, Input } from '@angular/core';
import { MonthlyIncome } from '../models/monthly-income.model';

@Component({
  selector: 'app-income-card',
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class IncomeCardComponent {
  @Input() monthlyIncome: MonthlyIncome;

  constructor() {
    this.monthlyIncome = {
      name: 'Income Name',
      description: 'Income Description',
      amount: 0,
    }; // Initialize with default values
  }
}
