import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvolucionPage } from './evolucion';

@NgModule({
  declarations: [
	EvolucionPage,
  ],
  imports: [
    IonicPageModule.forChild(EvolucionPage),
  ],
})
export class EvolucionPageModule {}
