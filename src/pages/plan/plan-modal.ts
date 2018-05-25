import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, ViewController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-plan',
  templateUrl: 'modal-component.html'
})

export class ModalContentPage {
  public grupo_alimenticios:any = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
  ) 
  {
    this.grupo_alimenticios = this.params.get('grupo_alimenticios');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verNotificaciones(){
    this.navCtrl.push('NotificacionesPage');
  }
  
}