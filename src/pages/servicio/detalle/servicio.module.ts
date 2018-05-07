import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicioDetallePage } from './servicio';

@NgModule({
  declarations: [
    ServicioDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ServicioDetallePage),
  ],
})
export class ServicioDetallePageModule {}