import { Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AppservicioProvider {

  public TAG: string = 'AppservicioProvider ';
  public loading: Loading;

  constructor(
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {}

  activarProgreso(enc: boolean,msg: string){
    console.log(msg);
  	if (enc){
      if ( this.loading == null ){
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
  	} else {
  	   this.loadingDismiss();  
  	}
  }

  loadingDismiss(){
    if ( this.loading != null ){
      this.loading.dismiss();
      this.loading = null;
    }
  }

  errorConeccion(error){
    this.loadingDismiss();
    console.log(this.TAG, JSON.stringify(error) );
    const alert: Alert = this.alertCtrl.create({
      message: 'Problema con la coneccion a internet',
      buttons:  ['OK']
    });
    alert.present();
  }

  alecrtMsg(msg){
    this.loadingDismiss();
    const alert: Alert = this.alertCtrl.create({
      message: msg,
      buttons:  ['OK']
    });
    alert.present();
  }

}
