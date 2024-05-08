import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Transaction } from '../models/transaction.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Observable, from,
  map, switchMap, take
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {
  expenseCategories = [
    { id: 1, name: "Rent", color: "#FF6384" },
    { id: 2, name: "Food", color: "#36A2EB" },
    { id: 3, name: "Groceries", color: "#FFCE56" },
    { id: 4, name: "Transportation", color: "#4BC0C0" },
    { id: 5, name: "HealthCare", color: "#9966FF" },
    { id: 6, name: "Entertainment", color: "#FF9F40" },
    { id: 7, name: "Clothing", color: "#4D5360" },
    { id: 8, name: "Education", color: "#B2912F" },
    { id: 9, name: "Utilities", color: "#36ebc4" },
    { id: 10, name: "Miscellaneous", color: "#EBCCD1" }
  ];


  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }
  getExpenseCategories() {
    return this.expenseCategories;
  }
  addTransaction(transaction: Transaction): Observable<String> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }

        const userId = user.uid;
        const transactions = this.afs.collection(`users/${userId}/transactions`);
        return from(transactions.add(transaction)).pipe(
          map((docRef) => {
            return docRef.id;
          })
        );
      })
    );
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }

        const userId = user.uid;
        const transactions = this.afs.collection<Transaction>(`users/${userId}/transactions`);

        return transactions.valueChanges({ idField: 'id' });
      })
    )
  }
  getExpenseTransactions(): Observable<Transaction[]> {
    return this.auth.user$.pipe(
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }
        const userId = user.uid;
        const transactions = this.afs.collection<Transaction>(`users/${userId}/transactions`, ref => ref.where('transactionType', '==', 'Expense'));
        return transactions.valueChanges({ idField: 'id' });
      })
    );
  }


  updateTransaction(transaction_id: string, changes: Partial<Transaction>): Observable<Boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }

        const userId = user.uid;
        const transactions = this.afs.collection<Transaction>(`users/${userId}/transactions`);

        return from(transactions.doc(transaction_id).update(changes)).pipe(
          map(() => true)
        );
      })
    )
  }

  deleteTransaction(transaction_id: string): Observable<Boolean> {
    return this.auth.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return new Observable<never>(observer => {
            observer.error('User not authenticated');
          });
        }

        const userId = user.uid;
        const transactions = this.afs.collection<Transaction>(`users/${userId}/transactions`);

        return from(transactions.doc(transaction_id).delete()).pipe(
          map(() => true)
        );
      })
    )
  }
}
