import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComunicacionPage } from './comunicacion';

@NgModule({
  declarations: [
    ComunicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(ComunicacionPage),
  ],
})
export class ComunicacionPageModule {}