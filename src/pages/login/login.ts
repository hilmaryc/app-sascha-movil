import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ServicioPage } from '../servicio/servicio';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    formBuilder: FormBuilder,
    public http: HttpClient
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  async loginUser(): Promise<void> {
    if (!this.loginForm.valid) {
      console.log(`Formulario no valido, concurente valor: ${this.loginForm.value}`);
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      try {
        console.log('AUTH');
        this.auth.loginUser('http://localhost:5000/login', email, password)
          .subscribe(
            (data)=>{
              console.log(" POLICIA");
              console.log(data);
            },
            (error)=>{
              console.log(error);
            }
          );
        await loading.dismiss();
        //this.navCtrl.setRoot(ServicioPage);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancelar' }]
        });
        alert.present();
      }   
    }
  }

  da(){

    var miheaders = new HttpHeaders();
      miheaders.append('Access-Control-Allow-Origin', '*');
      miheaders.append('Content-Type', 'application/json');
      miheaders.append('Accept', 'application/json');
  
    const httpOptions = {
      headers: miheaders
    };  

    let body = {
      correo: 'test.joseguerrero@gmail.com',
      contrasenia: '1234jose5678'
    }

    this.http.post('http://localhost:5000/login', JSON.stringify(body))
       .subscribe(
        (data)=>{
          console.log(" POLICIA");
          console.log(data);
        },
        (error)=>{console.log(error);}
       
       )

    /*
     this.auth.loginUser('http://localhost:5000/login', 'test.joseguerrero@gmail.com', '1234jose5678')
          .subscribe(
            (data)=>{
              console.log(" POLICIA");
              console.log(data);
            },
            (error)=>{
              console.log(error);
            }
          );
          */
  }

  logout(){
    console.log("LOGOUT");
   // firebase.auth().signOut();
  }

}
