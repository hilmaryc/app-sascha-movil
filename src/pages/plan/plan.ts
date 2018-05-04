import { Component } from '@angular/core';
import {  ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';


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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {
    this.plan = "comida";
  }

 ionViewDidEnter(){
    console.log('ionViewDidLoad PlanPage');
  }

 openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
 }

}

@Component({
  templateUrl: 'modal-component.html'
})

export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
  ) 
  {
    var characters = [
      {
        name: 'Desayuno',
        image: 'assets/imgs/desayuno.jpeg',
        items: [
          { title:'Cereales', note: 'Avena, Pan integral y Derivados' , cantidad: 150 + 'g' },
          { title:'Grasas', note: 'Mantequilla, Queso', cantidad: 150 + 'g' },
          { title: 'Verduras', note: 'verduras de hojas verdes, zanahoria, Frijoles', cantidad: 150 + 'g'},
          { title: 'Frutas', note: 'Melon, Naranja, Mora' , cantidad: 150+ 'g'}
        ]
      },
      {
        name: 'Almuerzo',
        image: 'assets/imgs/almuerzo.jpeg',
        items: [
          { title: 'Carnes', note: 'Buey , Cerdo, Pollo', cantidad: 150+'g' },
          { title: 'Verduras', note: 'verduras de hojas verdes, zanahoria, Frijoles', cantidad: 150+'g' },
          { title: 'Frutas', note: 'Melon, Naranja, Mora' , cantidad: 150+'g'},
          { title: 'Jugos', note: 'Lechoza, Naranja,Melon, Mora' , cantidad: 150+'ml'}
        ]
      },
      {
        name: 'Cena',
        image: 'assets/imgs/cena.jpeg',
        items: [
          { title: 'Lacteos', note: 'Yogurt, Leche', cantidad: 150+ 'ml' },
          { title:'Cereales', note: 'Avena, Pan integral y Derivados' , cantidad: 150+'g' },
          { title:'Grasas', note: 'Mantequilla, Queso', cantidad: 150+'g'  },
          { title: 'Frutas', note: 'Lechoza,Melon' , cantidad: 150+'g' }
        ]
      },
       {
        name: 'Meriendas',
        image: 'assets/imgs/complemento.jpeg',
        items: [
          { title: 'Lacteos', note: 'Yogurt, Leche,', cantidad: 150+ 'ml' },
          { title: 'Frutas', note: 'Naranja,lechoza,melon', cantidad: 150+ 'g' }
          
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  
}