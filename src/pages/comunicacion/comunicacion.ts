import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-comunicacion',
  templateUrl: 'comunicacion.html'
})
export class ComunicacionPage {

  razones:any;
  comunicaciones:any = [{
    "id": 1,
    "nombre": "Reclamo",
    "razones": [{
       "id": 1,
       "nombre": "Mi plan nutricional tiene alimentos que no me corresponden"
    } , {
       "id": 2,
       "nombre": "No vi los resultados esperados"
    }]
  } , {
    "id": 1,
    "nombre": "Quejas",
    "razones": [{
       "id": 1,
       "nombre": "El Nutricionista llego tarde"
    } , {
       "id": 2,
       "nombre": "El Nutricionista se fue de viaje"
    }]
  } , {
    "id": 1,
    "nombre": "Sugerencias",
    "razones": [{
       "id": 1,
       "nombre": "El nutricionista debe mejorar la atencion al cliente"
    } , {
       "id": 2,
       "nombre": "Agregar un servicio"
    }]
  }]

  constructor(
    public navCtrl:   NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
  }

  itemView(razones){
    console.log('Seleccionado:');
    console.log(razones);
    this.razones = razones;
  }

  enviar(){
    let alert = this.alertCtrl.create({
      title:    'Mensaje',
      subTitle: 'Su peticion ha sido enviada exitosamente!',
      buttons:  ['OK']
    });
    alert.present();
  }

}
