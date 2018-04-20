import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetaevoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'detaevo.html',
})
export class DetaevoPage {

  public services: any = [{
    "tipo_parametro":"Antropometrico",
    "parametro":"peso",
    "valor":"50kg"
  },{
    "tipo_parametro":"Bioquimico",
    "parametro":"Glicemia",
    "valor":"92 mg/dm"
  },{
    "tipo_parametro":"Patologico",
    "parametro":"Diabetes",
    "valor":" "
  }];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetaevoPage');
  }

}
