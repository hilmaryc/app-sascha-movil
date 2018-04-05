import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {
  constructor() {}

  loginUser(email: string, password: string) { //: Promise<User>
    //return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) { //: Promise<User>
    //return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser() { //: Promise<User>
    //return firebase.auth().signOut();
  }
}
