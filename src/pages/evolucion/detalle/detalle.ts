import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'detalle.html',
})
export class DetalleEvolucionPage {

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

  verNotificaciones(){
    
  }

}
