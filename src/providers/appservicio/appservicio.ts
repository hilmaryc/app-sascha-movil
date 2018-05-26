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
  	if (enc){
      console.log('inicio '+msg);
      if ( this.loading == null ){
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
  	} else {
        console.log('fin '+msg);
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
    if ( !error.status ){
      console.log(this.TAG, JSON.stringify(error) );
    } else{
      if ( error.status == 500 )
        this.alecrtMsg('Problema con la conexion del internet');
      if ( error.status == 404 || error.status == 400 )
        this.alecrtMsg(error.error.data.mensaje);  
    }
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
