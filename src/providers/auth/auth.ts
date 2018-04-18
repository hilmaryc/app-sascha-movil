import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthProvider {

  public TAG: string = 'AuthProvider';
  private url:string = 'http://localhost:5000/login';
  //private url:string = 'https://api-sascha.herokuapp.com/';
  private usuario: any;

  constructor(public http: HttpClient, private storage: Storage) {}

  loginUser(email: string, password: string){ 
  	//let body = {correo:"guerrero.c.jose.a@gmail.com", nombre_usuario: "jguerrero", contraseña: "1234" };
    let body = { correo: email, contraseña: password };
    return this.http.post(this.url, body);
  }

  authSuccess(data) {
    this.usuario = {
      error: false,
      token: data.data.token,
      message: data.data.mensaje
    };
    console.log(this.TAG,' authSuccess ' + JSON.stringify(this.usuario));
    this.storage.set('usuario', JSON.stringify(this.usuario) );
  }

  isAuth(): boolean{
    this.storage.ready().then(() => {
      this.storage.get('usuario').then( (usuario) => {
        console.log(this.TAG,' isAuth ' + JSON.stringify(usuario));
        return usuario.error;
      }).catch(console.log);
    });
    return false;
  }

  logoutUser() { 
    console.log(this.TAG,' logoutUser ' + 'se ha removido el token');
    this.storage.remove('token');
    this.storage.remove('message');
    this.storage.clear();
  }
}
