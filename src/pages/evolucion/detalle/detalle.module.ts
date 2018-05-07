import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleEvolucionPage } from './detalle';

@NgModule({
  declarations: [
    DetalleEvolucionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleEvolucionPage),
  ],
})
export class DetalleEvolucionPageModule {}