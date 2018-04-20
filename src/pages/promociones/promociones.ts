import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {


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
  
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(public navCtrl: NavController) {
  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad NotificacionesPage');
  }


}
