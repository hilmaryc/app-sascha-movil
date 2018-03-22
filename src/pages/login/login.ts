import { Component } from '@angular/core';
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
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import firebase from 'firebase/app';

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
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
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

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  async loginUser(): Promise<void> {
    if (!this.loginForm.valid) {
      console.log(
        `Formulario no valido, concurente valor: ${this.loginForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

     console.log("POLICE"); 
     console.log(email + "  " + password);

     if( email == 'saschanutric@gmail.com' && password == '123456' ){
        await loading.dismiss();
        this.navCtrl.setRoot(HomePage);
     }else{
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: 'error.message',
          buttons: [{ text: 'Ok', role: 'cancelar' }]
        });
        alert.present();
     }

/*
      try {
        const loginUser: firebase.User = await this.authProvider.loginUser(
          email,
          password
        );
        await loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancelar' }]
        });
        alert.present();
      }
      */
    }
  }

  logout(): void {
    console.log("POLICE");
    firebase.auth().signOut();
  }

}
