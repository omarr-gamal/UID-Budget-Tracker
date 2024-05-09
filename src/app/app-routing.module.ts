import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './services/auth.guard';

import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { IncomesPageComponent } from './pages/incomes-page/incomes-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
    canActivate: [authGuard],
  },
  { path: 'budgets', component: BudgetsPageComponent, canActivate: [authGuard], },
  { path: 'reports', component: ReportsPageComponent, canActivate: [authGuard], },
  { path: 'incomes', component: IncomesPageComponent, canActivate: [authGuard], },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
