import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicioPage } from './servicio';

@NgModule({
  declarations: [
    ServicioPage
  ],
  imports: [
    IonicPageModule.forChild(ServicioPage),
  ],
  entryComponents: [
  	ServicioPage
  ]
})
export class ServicioPageModule {}