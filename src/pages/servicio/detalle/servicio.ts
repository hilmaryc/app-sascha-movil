import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {
  public TAG: string = 'ServicioDetallePage';
  public servicio: any;
  public titulo_servicio: any = 'Servicios';
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    let data = navParams.data;
    console.log(JSON.stringify(data));
    if (JSON.stringify(data) != {})
    {
      this.servicio = data.servicio;
      let titilo = navParams.data.titulo_servicio;
      if ( titilo == "Mi Servicio") this.titulo_servicio = "Mi Servicio"
      else if ( titilo == "Mis Servicios") this.titulo_servicio = "Mi Servicio"
      else this.titulo_servicio = navParams.data.titulo_servicio;
    }
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

  ionViewDidLoad() { }

  solicitar(){
    this.navCtrl.push( 'SolicitudPage', this.servicio );
  }

  cancelar(){
    console.log('cancelar servicio');
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
