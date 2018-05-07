import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalContentPage } from './plan-modal';

@NgModule({
  declarations: [
    ModalContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalContentPage)
  ],
  entryComponents: [
    ModalContentPage
  ]
})
export class ModalContentPageModule {}