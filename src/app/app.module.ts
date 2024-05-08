import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

//primeng components
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { ChartModule } from 'primeng/chart';

import { BudgetsPageComponent } from './pages/budgets-page/budgets-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { DashboardSummaryCardsComponent } from './components/dashboard-summary-cards/dashboard-summary-cards.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { DashboardExpensesBrokenDownComponent } from './components/dashboard-expenses-broken-down/dashboard-expenses-broken-down.component';
import { CustomPanelComponent } from './components/custom-panel/custom-panel.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { DashboardMonthlyChartComponent } from './components/dashboard-monthly-chart/dashboard-monthly-chart.component';
import { IncomeCardComponent } from './income-card/income-card.component';
import { IncomesPageComponent } from './pages/incomes-page/incomes-page.component';
import { DialogModule } from 'primeng/dialog';
import { AddIncomeDialogComponent } from './components/add-income-dialog/add-income-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    TransactionsPageComponent,
    BudgetsPageComponent,
    ReportsPageComponent,
    IncomeCardComponent,
    IncomesPageComponent,
    DashboardSummaryCardsComponent,
    DashboardExpensesBrokenDownComponent,
    CustomPanelComponent,
    PageWrapperComponent,
    DashboardMonthlyChartComponent,
    AddIncomeDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    //primeng
    MenubarModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DataViewModule,
    TableModule,
    PanelModule,
    CardModule,
    FieldsetModule,
    SplitterModule,
    ChartModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
