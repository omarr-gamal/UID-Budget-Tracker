import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { MonthlyIncome } from '../models/monthly-income.model';

import { Budget } from '../models/budget.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { 
  Observable, catchError, filter, 
  first, from, map, switchMap, take 
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  /**
   * Adds a budget to the user's collection.
   *
   * @param {Budget} budget - The budget object to be added.
   * @return {Observable<String>} - An observable that emits the ID of the added budget.
   */
  addBudget(budget: Budget): Observable<String> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        
        const userId = user.uid;
        const budgets = this.afs.collection(`users/${userId}/budgets`);
        return from(budgets.add(budget)).pipe(
          map((docRef) => {
            return docRef.id;
          }),
        );
      })
    )
  }

  /**
   * Retrieves all budgets for the authenticated user.
   * 
   * @return {Observable<Budget[]>} - An observable that emits an array of budget objects including their ID.
   */
  getAllBudgets(): Observable<Budget[]> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        const userId = user.uid;
        const budgets = this.afs.collection<Budget>(`users/${userId}/budgets`);
        return budgets.valueChanges({ idField: 'id' });
      })
    )
  }

  /**
   * Updates a budget for the authenticated user.
   *
   * @param {string} budget_id - The ID of the budget to update.
   * @param {Partial<Budget>} changes - The partial changes to apply to the budget. For example {'name': 'new name'} will update the name of the budget.
   * @return {Observable<Boolean>} An observable that emits a boolean indicating the update success.
   */
  updateBudget(budget_id: string, changes: Partial<Budget>): Observable<Boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        const userId = user.uid;
        const budgetDoc = this.afs.doc<Budget>(`users/${userId}/budgets/${budget_id}`);
        return from(budgetDoc.update(changes)).pipe(
          map(() => true)
        );
      })
    )
  }

  deleteBudget(budget_id: string): Observable<Boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        const userId = user.uid;
        const budgetDoc = this.afs.doc<Budget>(`users/${userId}/budgets/${budget_id}`);
        return from(budgetDoc.delete()).pipe(
          map(() => true)
        );
      })
    )
  }

  addMonthlyIncome(monthlyIncome: MonthlyIncome): Observable<any> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        // add a new monthly income document
        const userId = user.uid;
        const incomes = this.afs.collection(`users/${userId}/monthly_incomes`);
        return from(incomes.add(monthlyIncome)).pipe(first());
      })
    );
  }
}
