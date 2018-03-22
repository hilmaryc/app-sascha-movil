import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  items = [
    'Planes nutricionales a tu medida',
    'Para lograr tu meta debes cumplir tu plan perfectamente ',
    '¿Quieres bajar de peso?'
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
