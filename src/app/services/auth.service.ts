import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';
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
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      return this.updateUserData(user as User);
        // console.log(user)
    }).catch((error) => {
        console.log(error)
    });
  }
  
  emailSignIn(email: string, password: string): Observable<User | null> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((credential) => {
        if (credential && credential.user) {
          return credential.user as User;
        } else {
          return null;
        }
      }),
    )
  }

  emailSignUp(email: string, password: string, displayName: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((credential) => {
        if (credential && credential.user) {
          console.log(credential)
          const user = {
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: displayName,
            photoURL: 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
          }
          
          return from(this.updateUserData(user as User));
        } else {
          return of(null);
        }
      }),
    )
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

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

}
