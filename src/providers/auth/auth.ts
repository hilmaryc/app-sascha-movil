import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthProvider {

  public TAG: string = 'AuthProvider';
  //private url:string = 'http://localhost:5000';
  private url:string = 'https://api-sascha.herokuapp.com';

  constructor(public http: HttpClient) {}

  loginUser(email: string, password: string){ 
  	//let body = {correo:"guerrero.c.jose.a@gmail.com", nombre_usuario: "jguerrero", contraseña: "1234" };
    let body = { correo: email, contraseña: password };
    return this.http.post(this.url + '/login', body);
  }

}
