import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './services/auth.guard';

import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { IncomesPageComponent } from './incomes-page/incomes-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
    canActivate: [authGuard],
  },
  { path: 'budgets', component: BudgetsPageComponent },
  {
    path: 'reports',
    component: ReportsPageComponent,
    canActivate: [authGuard],
  },
  { path: 'incomes', component: IncomesPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
