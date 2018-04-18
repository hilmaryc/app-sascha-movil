import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NotificacionesPage } from '../../pages/notificaciones/notificaciones';

/*
  Generated class for the NotificacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionesProvider {
  public TAG: string = 'NotificacionesProvider';

  constructor(public http: HttpClient,  public modalCtrl: ModalController) {
    console.log('Hello NotificacionesProvider Provider');
  }

  verNotificaciones(){
  	console.log(this.TAG,' verNotificaciones ');
  	this.modalCtrl.create(NotificacionesPage);
  }

}
