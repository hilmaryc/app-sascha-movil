import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePickerModule } from 'ionic3-datepicker';
import { EvolucionPage } from './evolucion';

@NgModule({
  declarations: [
    EvolucionPage,
  ],
  imports: [
    IonicPageModule.forChild(EvolucionPage),
    DatePickerModule,
  ],
})
export class EvolucionPageModule {}