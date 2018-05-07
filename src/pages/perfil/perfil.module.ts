import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatePickerModule } from 'ionic3-datepicker';
import { PerfilPage } from './perfil';

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
    DatePickerModule,
  ],
  providers: [
  ]
})
export class PerfilPageModule {}
