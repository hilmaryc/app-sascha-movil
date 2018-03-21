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

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad PromocionesPage');
  }

}
