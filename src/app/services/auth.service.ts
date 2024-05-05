import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, take, filter } from 'rxjs/operators';
import { User } from '../models/user.model';
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        return this.updateUserData(user as User);
        // console.log(user)
      }).catch((error) => {
        console.log(error)
      });
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    
    return userRef.set(data, { merge: true });
  }

  async emailSignIn(email: string, password: string) {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (credential && credential.user) {
          return this.updateUserData(credential.user as User);
      } else {
          // Handle the case where user is null
      }
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

}
