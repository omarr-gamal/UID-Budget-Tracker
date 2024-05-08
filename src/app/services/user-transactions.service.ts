import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Transaction } from '../models/transaction.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { 
  Observable, from,
  map, switchMap, take 
} from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserTransactionsService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

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

        var newBalance = user.mainWalletAmount;
        if (transaction.transactionType === "Income") newBalance += transaction.amount;
        else newBalance -= transaction.amount;

        const usersCollection = this.afs.collection<User>(`users`);
        usersCollection.doc(user.uid).update({"mainWalletAmount": newBalance})

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
