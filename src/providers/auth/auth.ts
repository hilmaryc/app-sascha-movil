import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {}

  loginUser(url: string,email: string, password: string){ 
  	let body = {
		correo: email,
		contraseña: password
	}
	var miheaders = new HttpHeaders();
      	miheaders.append('Access-Control-Allow-Origin', '*');
      	miheaders.append('Content-Type', 'application/json');
      	miheaders.append('Accept', 'application/json');
  	const httpOptions = {
    	headers: miheaders
  	};  
  	return this.http.post(url, JSON.stringify(body) ,httpOptions);
  }

  logoutUser() { //: Promise<User>
    //return firebase.auth().signOut();
  }
}
