import { Component, OnInit } from '@angular/core';
import { Budget } from '../../models/budget.model';
import { UserBudgetsService } from '../../services/user-budgets.service';

@Component({
  selector: 'app-budgets-page',
  templateUrl: './budgets-page.component.html',
  styleUrl: './budgets-page.component.css'
})
export class BudgetsPageComponent implements OnInit{
  constructor(private budgetService: UserBudgetsService) {}
  budgets: Budget[] = [];
  ngOnInit() {
    this.loadAllBudgets();
  }
  loadAllBudgets() {
    this.budgetService.getAllBudgets().subscribe({
      next: (budgets) => {
        this.budgets = budgets;
        console.log('Budgets loaded:', budgets);
      },
      error: (err) => {
        console.error('Failed to load budgets:', err);
      }
    });
  }

  /*addDummyBudgets() {
    const dummyBudgets: Budget[] = [
      { name: 'Vacation', description: 'Trip to Hawaii', amount: 2000 },
      { name: 'Groceries', description: 'Monthly groceries', amount: 300 },
      { name: 'Gym', description: 'Annual Gym Membership', amount: 600 }
    ];

    dummyBudgets.forEach(budget => {
      this.budgetService.addBudget(budget).subscribe({
        next: (id) => console.log(`Added budget with ID: ${id}`),
        error: (err) => console.error('Error adding budget:', err)
      });
    });
  }*/
}
