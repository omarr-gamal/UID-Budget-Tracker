import { Component, ViewEncapsulation, Input } from '@angular/core';
import { MonthlyIncome } from '../models/monthly-income.model';
import { FormGroup, FormControl } from '@angular/forms';
import { UserIncomesService } from '../services/user-incomes.service';

@Component({
  selector: 'app-income-card',
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class IncomeCardComponent {
  @Input() monthlyIncome: MonthlyIncome;
  editMode: boolean = false;

  constructor(private incomesService: UserIncomesService) {
    this.monthlyIncome = {
      title: 'Income Name',
      description: 'Income Description',
      amount: 0,
      incomeCategory: 'Income Category',
      startDate: new Date(),
      endDate: new Date(),
      id: '',
    }; // Initialize with default values
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  saveChanges() {
    // console.log(this.monthlyIncome);
    if (this.monthlyIncome.id) {
      this.incomesService
        .updateMonthlyIncome(this.monthlyIncome.id, this.monthlyIncome)
        .subscribe(
          (result) => {
            console.log('Income updated successfully');
            this.toggleEditMode();
          },
          (error) => {
            console.log('Error updating income: ', error);
          }
        );
    }
    this.toggleEditMode();
  }
  cancelEdit() {
    this.toggleEditMode();
  }
}
