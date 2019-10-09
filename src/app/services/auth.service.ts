import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import {switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;


  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null) ))
    );
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateuserData(credential.user);
  }


  private updateuserData({uid, email, displayName, photoURL, isAnonymous}) {
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous
    };

    return this.db.updateAt(path, data);
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

}
