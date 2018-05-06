import { Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AppservicioProvider {

  public TAG: string = 'AppservicioProvider ';
  public loading: Loading;

  constructor(
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {}

  activarProgreso(enc: boolean){
  	if (enc){
  	  this.loading = this.loadingCtrl.create();
      this.loading.present();
  	} else {
  	  this.loading.dismiss();
  	}
  }

  errorConeccion(error){
    this.loading.dismiss();
    console.log( JSON.stringify(error) );
    const alert: Alert = this.alertCtrl.create({
      message: 'Problema con la coneccion a internet',
      buttons: [{ text: 'Ok', role: 'cancelar' }]
    });
    alert.present();
  }

  alecrtMsg(msg){
    const alert: Alert = this.alertCtrl.create({
      message: msg,
      buttons: [{ text: 'Ok', role: 'cancelar' }]
    });
    alert.present();
  }

}
