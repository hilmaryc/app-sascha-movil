import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  public TAG: string = 'NotificacionesPage';
  noti=[
      {"mensaje":"mensaje1","descripcion":"Descripcion de la notificacion","icono":"notifications"},
      {"mensaje":"mensaje2","descripcion":"Descripcion de la notificacion","icono":"pricetags"},
      {"mensaje":"mensaje3","descripcion":"Descripcion de la notificacion","icono":""}      
  ];

  items = [
    { image: "assets/imgs/descuento.jpeg", titulo: 'Planes nutricionales a tu medida', detalle  : 'Durante este mes tendremos un descuento del 20% en consultas nutricionales para deportista' , fecha: '12/04/2018' },
    { image: "assets/imgs/complemento.jpeg", titulo: 'Para lograr tu meta debes cumplir', detalle  : 'Recuerda tomar tus vitaminas E diariamente', fecha: '12/04/2018' },
    { image: "assets/imgs/meta.jpeg", titulo: '¿Quieres bajar de peso?', detalle  : 'Tu proxima cita de control es para el dia 20/05/2018 por favor asiste', fecha: '12/04/2018' }
  ];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(public navCtrl: NavController) {
    console.log(this.TAG,' verNotificaciones ');
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad NotificacionesPage');
  }

}
