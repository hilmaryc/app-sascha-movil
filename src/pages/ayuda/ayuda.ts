import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';
import { AyudasProvider } from '../../providers/ayudas/ayudas';

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {
  
  public ayudas: any;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  public alertCtrl: AlertController,
  			  public viewCtrl: ViewController,
          public serviApp: AppservicioProvider,
          public ayudasProv: AyudasProvider,
          public nacCtrl: NavController) {
    this.getAyudas();
  }

async getAyudas():Promise<void>{
    this.serviApp.activarProgreso(true);
    await this.ayudasProv.getAll()
    .subscribe(
      (res)=>{
        this.ayudas = res['data'];
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

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
     this.navCtrl.push('NotificacionesPage');
  }
}
