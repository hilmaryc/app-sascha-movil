import { Component } from '@angular/core';
import { NavController, NavParams,  AlertController } from 'ionic-angular';

@Component({
  selector: 'page-pedircita',
  templateUrl: 'pedircita.html',
})
export class PedircitaPage {

   public event = {
     month: '2018-05-19',
     timeStarts: '08:45',
     timeEnds: '2018-05-20'
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController ) {
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad PedircitaPage');
  }

  enviar(){
    let alert = this.alertCtrl.create({
      title:    'Cita',
      subTitle: 'Su solicitud ha sido enviada exitosamente!',
      buttons:  ['OK']
    });
    alert.present();
  }

}
