import { Component } from '@angular/core';
import { ModalController, NavController, ViewController, NavParams, AlertController } from 'ionic-angular';
import { NotificacionesPage } from '../../notificaciones/notificaciones';

@Component({
  selector: 'page-solocitud',
  templateUrl: 'solicitud.html',
})
export class SolicitudPage {
  public TAG: string = 'SolicitudPage';
  public servicio: any;
  public nutricionistas: any = [{
    "id":"1",
    "nombre":"Jose Coronel"
  } , {
    "id":"2",
    "nombre":"Dario Suarez"
  } , {
    "id":"3",
    "nombre":"Daniel Montero"
  }];
  public horas: any = [{
    "id":"1",
    "bloque":"7:00 a 9:00"
  } , {
    "id":"2",
    "bloque":"9:00 a 12:00"
  } , {
    "id":"3",
    "bloque":"2:00 a 4:00"
  } , {
    "id":"4",
    "bloque":"4:00 a 6:00"
  } , {
    "id":"5",
    "bloque":"6:00 a 8:00"
  } , {
    "id":"6",
    "bloque":"8:00 a 10:00"
  }];
  public motivos: any = [{
    "id":"1",
    "motivo":"Primera visita"
  } , {
    "id":"2",
    "motivo":"Reinsidencia visita"
  }];
  public idNutricionista:any;
  public idHora:any;
  public idMotivo:any;
  public fechas:any;
  public solicitud:any;
  public itemSelect:any;

  public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  
  public min: Date = new Date()
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));

  public disabledDates: Date[] = [new Date(2018, 3, 1), new Date(2018, 3, 3), new Date(2018, 3, 5)];
  public markDates: Date[] = [new Date(2018, 3, 2), new Date(2018, 3, 4), new Date(2018, 3, 6)];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.servicio = navParams.data;
    this.idNutricionista = this.nutricionistas[0].id;
    this.idHora = this.horas[0].id;
    this.idMotivo = this.motivos[0].id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioDetallePage');
  }

  solicitar(){

    var msg = 'El servicio tiene un costo por ' + this.servicio.precio + ' Desea solicitarlo?'
    let alert = this.alertCtrl.create({
      title:    'Mensaje',
      subTitle: msg ,
      buttons:  [{
        text: "SI",
        handler: data => {
          console.log('Accion SI' + data)
        } 
      } , {
        text: "NO",
        handler: data => {
          console.log('Accion NO')
        } 
      }]
    });
    alert.present();
    this.dismiss()
  }
  itemView(item){
    console.log(this.TAG,' Item Seleccionado: ' + JSON.stringify(item));
    this.itemSelect = item;
  }
  selectNutricionista(){
    this.idNutricionista = this.itemSelect.id;
    console.log(this.TAG,' Nutricionista Seleccionado: ' + JSON.stringify(this.idNutricionista));
  }
  selectHora(){
    this.idHora=this.itemSelect.id;
    console.log(this.TAG,' Hora Seleccionado: ' + JSON.stringify(this.idHora));
  }
  selectMotivo(){
    this.idMotivo=this.itemSelect.id;
    console.log(this.TAG,' Motivo Seleccionado: ' + JSON.stringify(this.idMotivo));
  }

  public Log(stuff): void {
    console.log(stuff);
  }
  public event(data: Date): void {
    this.localDate = data;
  }

  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  verNotificaciones(){
     this.navCtrl.push(NotificacionesPage);
  }
}
