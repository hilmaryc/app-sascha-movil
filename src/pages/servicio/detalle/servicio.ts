import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppservicioProvider } from '../../../providers/appservicio/appservicio';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {
  public TAG: string = 'ServicioDetallePage';
  public servicio: any = null;
  public promocion: any = null;
  public titulo_servicio: any = 'Servicios'
  public tipo_notificacion: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviApp: AppservicioProvider) {

    let data = navParams.data;
    if (JSON.stringify(data) != {})
    {
      this.servicio = data.servicio;
      this.promocion = data.promocion;
      this.tipo_notificacion = data.tipo_notificacion;
      if ( this.promocion != null ){
        this.promocion.valido_desde = moment(this.promocion.valido_desde).format("DD/MM/YYYY");
        this.promocion.valido_hasta = moment(this.promocion.hasta).format("DD/MM/YYYY");
      }
      let titilo = data.titulo_servicio;
      if ( titilo == "Mi Servicio") this.titulo_servicio = "Mi Servicio"
      else if ( titilo == "Mis Servicios") this.titulo_servicio = "Mi Servicio"
      else this.titulo_servicio = titilo;
    }
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

  solicitar(servicio){
    this.navCtrl.push( 'SolicitudPage', {
      "servicio": servicio,
      "tipo_notificacion": this.tipo_notificacion || null
    } );
  }

}
