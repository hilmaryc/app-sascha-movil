import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {

items = [
    { image: "assets/imgs/descuento.jpeg", titulo: 'Planes nutricionales a tu medida', detalle  : 'Durante este mes tendremos un descuento del 20% en consultas nutricionales para deportista' , fecha: '12/04/2018' },
    { image: "assets/imgs/complemento.jpeg", titulo: 'Para lograr tu meta debes cumplir', detalle  : 'Recuerda tomar tus vitaminas E diariamente', fecha: '12/04/2018' },
    { image: "assets/imgs/meta.jpeg", titulo: '¿Quieres bajar de peso?', detalle  : 'Tu proxima cita de control es para el dia 20/05/2018 por favor asiste', fecha: '12/04/2018' }
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
