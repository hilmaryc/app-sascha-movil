import { Component } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//import { LoadingController } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';
import { FiltroPage } from '../../pages/servicio/filtro/filtro'
import { ServicioDetallePage } from '../../pages/servicio/detalle/servicio'

@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html'
})
export class ServicioPage {

  public services: any = [{
    "id":"1",
    "titulo":"Consulta Nutricional",
    "img":"../../assets/imgs/consulta.jpg",
    "descripcion":"Un nutricionista calificado realiza una evaluación de tu estado nutricional"
  },{
    "id":"2",
    "titulo":"Control de obesidad",
    "img":"../../assets/imgs/obesidad.jpg",
    "descripcion":"Consejos alimenticios y planes nutricionales para el control de peso."
  },{
    "id":"3",
    "titulo":"Nutrición Deportiva",
    "img":"../../assets/imgs/deportiva.jpg",
    "descripcion":"Planes de nutrición especializados para deportistas."
  }];
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public proveedor: RemoteProvider, 
    public alertCtrl: AlertController) { 
    //, private load : LoadingController
  }

  showFilter() {
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }

  showDetail(params){
    this.navCtrl.push(ServicioDetallePage, params );
  }

  ionViewDidEnter(){

/*
  let progress = this.load.create({
      content: 'Please wait…'
    });

  progress.present();
*/


  this.proveedor.getUsers('http://localhost:5000/suscripciones')
       .subscribe(
        (data)=>{
   //       this.users = data;
  //        progress.dismiss();
          console.log(" POLICIA");
          console.log(data);
        },
        (error)=>{console.log(error);}
       
       )

  }

}