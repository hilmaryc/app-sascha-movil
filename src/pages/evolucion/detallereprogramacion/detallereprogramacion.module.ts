import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePickerModule } from 'ionic3-datepicker';
import { DetallereprogramacionPage } from './detallereprogramacion';

@NgModule({
  declarations: [
    DetallereprogramacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallereprogramacionPage),
    DatePickerModule,
  ],
})
export class DetallereprogramacionPageModule {}
