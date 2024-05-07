import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MonthlyIncome } from '../models/monthly-income.model';
import { Observable, catchError, filter, first, from, map, switchMap, take } from 'rxjs';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  addBudget(budget: Budget): Observable<Boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        
        const userId = user.uid;
        const coll = this.afs.collection(`users/${userId}/budgets`);
        return from(coll.add(budget)).pipe(
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
        const coll = this.afs.collection(`users/${userId}/monthly_incomes`);
        return from(coll.add(monthlyIncome)).pipe(first());
      })
    );
  }
}
