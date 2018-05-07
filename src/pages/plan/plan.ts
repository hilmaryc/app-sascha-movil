import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan-nutricional.html',
})
export class PlanPage {
  plan;
  suplementos:any = [{
    "nombre":"Ornitina",
    "frecuencia": 2,
    "cantidad": "100ml"
  } , {
    "nombre":"Acidófilos",
    "frecuencia": 3,
    "cantidad": "500ml"
  } , {
    "nombre":"Omega3",
    "frecuencia": 1,
    "cantidad": "50ml"
  } , {
    "nombre":"Creatina",
    "frecuencia": 2,
    "cantidad": "4ml"
  } , {
    "nombre":"Calcio",
    "frecuencia": 3,
    "cantidad": "300ml"
  }];

  actividades:any = [{
    "nombre":"Caminar",
    "cantidad": 1,
    "unidad":"hora"
  } , {
    "nombre":"Correr",
    "cantidad": 2,
    "unidad":"kilometros"
  } , {
    "nombre":"Ejercicio de piernas",
    "cantidad": 30,
    "unidad":"minutos"
  } , {
    "nombre":"Ejercicio de brazos",
    "cantidad": 30,
    "unidad":"minutos"
  }];

  constructor(
    public modalCtrl: ModalController, 
    public navCtrl: NavController) {
    this.plan = "comida";
  }

 ionViewDidEnter(){
    console.log('ionViewDidLoad PlanPage');
  }

 openModal(characterNum) {
    let modal = this.modalCtrl.create('ModalContentPage', characterNum);
    modal.present();
 }

}