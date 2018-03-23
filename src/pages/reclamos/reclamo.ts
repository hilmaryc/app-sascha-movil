import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-reclamo',
  templateUrl: 'reclamo.html'
})
export class ReclamoPage {

  constructor(
    public navCtrl:   NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
  }

  enviar(){
    let alert = this.alertCtrl.create({
      title:    'Reclamo',
      subTitle: 'Su peticion ha sido enviada exitosamente!',
      buttons:  ['OK']
    });
    alert.present();
  }

}
