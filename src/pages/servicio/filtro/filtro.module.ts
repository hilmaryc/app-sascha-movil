import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroPage } from './filtro';

@NgModule({
  declarations: [
    FiltroPage
  ],
  imports: [
    IonicPageModule.forChild(FiltroPage),
  ],
  entryComponents: [
  	FiltroPage
  ]
})
export class FiltroPageModule {}