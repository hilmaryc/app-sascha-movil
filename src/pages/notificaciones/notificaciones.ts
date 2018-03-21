import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
