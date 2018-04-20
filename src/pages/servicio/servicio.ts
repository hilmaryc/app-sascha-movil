import { Component } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//import { LoadingController } from 'ionic-angular';
import { FiltroPage } from '../../pages/servicio/filtro/filtro';
import { ServicioDetallePage } from '../../pages/servicio/detalle/servicio';
import { NotificacionesProvider } from '../../providers/notificaciones/notificaciones';
import { NotificacionesPage } from '../../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../../pages/promociones/promociones';
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html'
})
export class ServicioPage {

  public TAG: string = 'ServicioPage';
  servicio;

  public services: any = [{
    "id":"1",
    "titulo":"Plan para Adultos Mayores",
    "img":"../../assets/imgs/nutricionadultos.jpg",
    "descripcion":"Un nutricionista calificado realiza una evaluación de tu estado nutricional",
    "precio": "100$"
  } , {
    "id":"2",
    "titulo":"Plan Control de obesidad",
    "img":"../../assets/imgs/controlobe.jpg",
    "descripcion":"Consejos alimenticios y planes nutricionales para el control de peso.",
    "precio": "120$"
  } , {
    "id":"3",
    "titulo":"Plan Nutrición Deportiva",
    "img":"../../assets/imgs/nutydep1.jpg",
    "descripcion":"Planes de nutrición especializados para deportistas.",
    "precio": "90$"
  } , {
    "id":"4",
    "titulo":"Plan Alimentacion Infantil",
    "img":"../../assets/imgs/nutinf.jpeg",
    "descripcion":"Un Nutricionista hará un plan nutricional para el niño, teniendo en cuenta los hábitos de alimentacion de la familia.",
    "precio": "90$"
  } , {
    "id":"5",
    "titulo":"Plan Gana Peso con salud",
    "img":"../../assets/imgs/Ganarpeso.jpg",
    "descripcion":"Gana peso a un ritmo adecuado de manera saludable. Equilibra tu masa muscular y porcentaje de grasa hasta conseguir el peso deseado.",
    "precio": "90$"
  } , {
    "id":"6",
    "titulo":"Plan alimentacion durante el embarazo",
    "img":"../../assets/imgs/Nutricionembarazo.jpg",
    "descripcion":"Tu nutricionista te proporcionara un plan adecuado durante la gestación, siguiendo las pautas necesarias para cubrir las necesidades nutricionales del bebé.",
    "precio": "90$"
  }];

  public promos: any = [{
    "id":"1",
    "titulo":"Promocion Mes de las Madres",
    "img":"../../assets/imgs/promomama.jpg",
    "descripcion":"En el mes de Mayo las madres recibiran un precio especial en su Plan alimentacion durante el embarazo",
    "precio": "70$"
  } , {
    "id":"2",
    "titulo":"Promocion Dia del padre",
    "img":"../../assets/imgs/promopapa.jpg",
    "descripcion":"Durante el mes de Junio los padres recibiran un descuento en el precio de su servicio.",
    "precio": "10%"
  } , {
    "id":"3",
    "titulo":"Mes del niño",
    "img":"../../assets/imgs/promoninos.jpg",
    "descripcion":"En Julio los consentidos recibiran un precio especial en su plan de alimentacion infantil.",
    "precio": "80$"
  } , {
    "id":"4",
    "titulo":"Promo Vacaciones",
    "img":"../../assets/imgs/promomes.png",
    "descripcion":"Recibe un descuento especial durante el mes de agosto en el plan de Gana peso con salud",
    "precio": "90$"

  }];

  public valoracion: any = [{
    "id":"1",
    "criterio":"malo"
    },{
    "id":"2",
    "criterio":"regular"

  }];

  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public alertCtrl: AlertController,
    public notificaciones: NotificacionesProvider) { 
    //, private load : LoadingController
    this.servicio = "servi";
     
  }

  showFilter() {
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }

  showDetail(params){
    console.log(this.TAG,' showDetail ' + JSON.stringify(params));
    this.navCtrl.push(ServicioDetallePage, params );
  }


  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }

  verNotificaciones(){

    this.navCtrl.push(NotificacionesPage);
  }

  verPromocion(){
     
     this.navCtrl.push(PromocionesPage)

  }
 
}