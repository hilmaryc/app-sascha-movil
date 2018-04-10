import { Component } from '@angular/core';
import {  ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan-nutricional.html',
})
export class PlanPage {

  suplementos:any = [{
    "nombre":"Ornitina",
    "cantidad": 2
  } , {
    "nombre":"Acidófilos",
    "cantidad": 3
  } , {
    "nombre":"Omega3",
    "cantidad": 6
  } , {
    "nombre":"Creatina",
    "cantidad": 1
  } , {
    "nombre":"Calcio",
    "cantidad": 5
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

  constructor(public modalCtrl: ModalController) { }

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
    public viewCtrl: ViewController
  ) 
  {
    var characters = [
      {
        name: 'Desayuno',
        image: 'assets/imgs/desayuno.jpeg',
      
      },
      {
        name: 'Almuerzo',
        image: 'assets/imgs/almuerzo.jpeg',
        items: [
          { title: 'Carnes', note: 'Buey , Cerdo, Pollo' },
          { title: 'Verduras', note: 'verduras de hojas verdes, zanahoria, Frijoles' },
          { title: 'Frutas', note: 'Melon, Naranja, Mora' }
        ]
      },
      {
        name: 'Cena',
        image: 'assets/imgs/cena.jpeg',
        items: [
          { title: 'Lacteos', note: 'Yogurt, Leche' },
          { title:'Cereales', note: 'Avena, Pan integral y Derivados' },
          { title:'Grasas', note: 'Mantequilla, Queso' },
          { title: 'Frutas', note: 'Lechoza,Melon' }
        ]
      },
       {
        name: 'Meriendas',
        image: 'assets/imgs/complemento.jpeg',
        items: [
          { title: 'Frutas', note: 'Naranja ,Melón, Piña' },
          
        ]
      },
       {
        name: 'Actividades',
        image: 'assets/imgs/deporte.png',
        items: [
          { title: 'Ejercicios', note: 'Abdominales , Piernas, Cardio ' },
          { title: 'Trotes', note: 'Trotes continuos, caminar 1 hora diaria' } 
        ]
      },
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}