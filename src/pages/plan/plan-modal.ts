import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, ViewController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-plan',
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

  verNotificaciones(){
    this.navCtrl.push('NotificacionesPage');
  }
  
}