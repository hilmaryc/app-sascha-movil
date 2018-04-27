import { Component } from '@angular/core';
import { NavController, 
		 NavParams, 
		 AlertController, 
		 ViewController } from 'ionic-angular';
import { NotificacionesPage } from '../notificaciones/notificaciones';

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {
	ayudas = [
		{"id":"1","pregunta":"¿Como reprogramo mi cita?","respuesta":" Ingresa en la opcion Mi Evolucion en el menu principal y presiona el boton Reprogramar"},
		{"id":"2","pregunta":"¿Como visualizo mi progreso?","respuesta":"Ingresa en la opcion Mi Evolucion "},
		{"id":"3","pregunta":"¿Como gestiono la garantia?","respuesta":"Ingresa en la opcion Comunicacion y realiza un reclamo"},
		{"id":"4","pregunta":"¿Que hago si el servicio que necesito no esta disponible?","respuesta":"Ingresa en la opcion Comunicacion y dejanos tu sugerencia, te notificaremos cuando el servicio solicitado este disponible"},
		{"id":"5","pregunta":"¿Como valoro el servicio?","respuesta":"¿Puedes valorar el servicio cada vez que asistas a una visita en la opcion Mi Evolucion?"}
	];
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  public alertCtrl: AlertController,
  			  public viewCtrl: ViewController,
          public nacCtrl: NavController) {}

mostrar(pregunta,respuesta){
	let alert =this.alertCtrl.create({
		title: pregunta,
		subTitle: respuesta,
		buttons:  [{
        text: "Ok",
        handler: data => {
          console.log('Accion SI' + data)
        } 
      }]});
	alert.present();
	}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');
  }
  
  verNotificaciones(){
    //this.notificaciones.verNotificaciones();
     this.navCtrl.push(NotificacionesPage);
  }
}
