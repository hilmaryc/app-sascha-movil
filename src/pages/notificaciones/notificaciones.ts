import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  public TAG: string = 'NotificacionesPage';
  
  public notis: any = [{
    "id":"1",
    "tipo":"Promocion",
    "titulo":"Descuento mes de las madres",
    "img":"../../assets/imgs/promomama.jpg",
    "descripcion":"En el mes de Mayo las madres recibiran un precio especial en su Plan alimentacion durante el embarazo",
    "icono":"pricetags"
  } , {
    "id":"2",
    "tipo":"Garantia",
    "titulo":"Su reclamo fue aprobado",
    "img":"",
    "descripcion":"Su reclamo por garantia fue aprobado, proceda a solicitar su cita",
    "icono":"star"
  } , {
    "id":"3",
    "tipo":"Cita asignada",
    "titulo":"Su cita de control fue asignada",
    "img":"",
    "descripcion":"Su cita de control fue asignada para el dia 10/04/2018 hora 2:00pm",
    "icono":"medkit"
  }];

  items = [
    { image: "assets/imgs/descuento.jpeg", titulo: 'Planes nutricionales a tu medida', detalle  : 'Durante este mes tendremos un descuento del 20% en consultas nutricionales para deportista' , fecha: '12/04/2018' },
    { image: "assets/imgs/complemento.jpeg", titulo: 'Para lograr tu meta debes cumplir', detalle  : 'Recuerda tomar tus vitaminas E diariamente', fecha: '12/04/2018' },
    { image: "assets/imgs/meta.jpeg", titulo: '¿Quieres bajar de peso?', detalle  : 'Tu proxima cita de control es para el dia 20/05/2018 por favor asiste', fecha: '12/04/2018' }
  ];

  public subscription;

  constructor(
    public navCtrl: NavController,
    private storage: Storage) {
    this.subscription = Observable.interval(10000).subscribe(x => {
      // the number 1000 is on miliseconds so every second is going to have an iteration of what is inside this code.
      this.getNotificaciones();
    });
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  getNotificaciones(){
     this.storage.ready().then(() => {
      this.storage.get('notificacion').then( (notificacion) => {
        console.log(this.TAG,JSON.stringify(notificacion));
      }).catch((err) =>{
        console.log(err);
      });
    });
  }
  
  showDetail(params){
    console.log(this.TAG,' showDetail ' + JSON.stringify(params));
    this.navCtrl.push('DetallenotiPage', params );
  }
}
