import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudPage } from './solicitud';
import { DatePickerModule } from 'ionic3-datepicker';

@NgModule({
  declarations: [
    SolicitudPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudPage),
    DatePickerModule,
  ],
})
export class SolicitudPageModule {}