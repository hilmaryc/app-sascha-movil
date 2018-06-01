import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { VisitadetallesProvider } from '../../../providers/visitadetalles/visitadetalles';
import { AppservicioProvider } from '../../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'detalle.html',
})
export class DetalleEvolucionPage {

  public TAG:string = 'DetalleEvolucionPage';
  public id_visita:string=null;
  public detalles: any=null;
  
  constructor(
    public navParams: NavParams,
    public detalleProv: VisitadetallesProvider,
    public serviApp: AppservicioProvider
    ) {
    this.id_visita = navParams.data;
    if (this.id_visita != null ) this.getDetalle(this.id_visita);
  }

  async getDetalle(id): Promise<void> {
    let metodo = ': metodo getDetalle';
    if ( id != '[object Object]' ){
      this.serviApp.activarProgreso(true,this.TAG + metodo);
      await this.detalleProv.get(id)
        .subscribe(
        (res)=>{
          this.detalles = res['data'].detalles || [];
          this.serviApp.activarProgreso(false,this.TAG + metodo);
        },
        (error)=>{
          this.serviApp.errorConeccion(error);
        }
      );  
    }
  }

  verNotificaciones(){
    
  }

}
