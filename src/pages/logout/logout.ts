import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    console.log('Cerrando Sesion');
    firebase.auth().signOut();
  }

}
