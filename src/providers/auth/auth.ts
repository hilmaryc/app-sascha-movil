import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  constructor() {}

  loginUser(email: string, password: string){ 

  }

  logoutUser() { //: Promise<User>
    //return firebase.auth().signOut();
  }
}
