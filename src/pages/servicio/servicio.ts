import { Component } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//import { LoadingController } from 'ionic-angular';
import { FiltroPage } from '../../pages/servicio/filtro/filtro';
import { ServicioDetallePage } from '../../pages/servicio/detalle/servicio';
import { NotificacionesProvider } from '../../providers/notificaciones/notificaciones'

@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html'
})
export class ServicioPage {

  public TAG: string = 'ServicioPage';
  public services: any = [{
    "id":"1",
    "titulo":"Consulta Nutricional",
    "img":"../../assets/imgs/consulta.jpg",
    "descripcion":"Un nutricionista calificado realiza una evaluación de tu estado nutricional",
    "precio": "100$"
  } , {
    "id":"2",
    "titulo":"Control de obesidad",
    "img":"../../assets/imgs/obesidad.jpg",
    "descripcion":"Consejos alimenticios y planes nutricionales para el control de peso.",
    "precio": "120$"
  } , {
    "id":"3",
    "titulo":"Nutrición Deportiva",
    "img":"../../assets/imgs/deportiva.jpg",
    "descripcion":"Planes de nutrición especializados para deportistas.",
    "precio": "90$"
  } , {
    "id":"4",
    "titulo":"Alimentacion Infantil",
    "img":"../../assets/imgs/deportiva.jpg",
    "descripcion":"En este plan tu Nutricionista tratará el peso del niño, pero teniendo en cuenta los hábitos de la familia en su conjunto.",
    "precio": "90$"
  } , {
    "id":"5",
    "titulo":"Gana Peso con salud",
    "img":"../../assets/imgs/deportiva.jpg",
    "descripcion":"Gana peso a un ritmo adecuado, dentro de un contexto de salud. Aumentarás de forma progresiva y equilibrada tu masa muscular y grasa hasta conseguir el peso deseado.",
    "precio": "90$"
  } , {
    "id":"6",
    "titulo":"Dieta para embarazadas",
    "img":"../../assets/imgs/deportiva.jpg",
    "descripcion":"Tu nutricionista te cuidará durante la gestación con un Plan Nutricional Personalizado, te dará las pautas necesarias para cubrir las necesidades nutricionales de la madre y satisfacer las exigencias nutritivas del bebé.",
    "precio": "90$"
  }];
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public alertCtrl: AlertController,
    public notificaciones: NotificacionesProvider) { 
    //, private load : LoadingController
  }

  showFilter() {
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }

  showDetail(params){
    console.log(this.TAG,' showDetail ' + JSON.stringify(params));
    this.navCtrl.push(ServicioDetallePage, params );
  }

  verNotificaciones(){
    this.notificaciones.verNotificaciones();
  }

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }

}