import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioPage } from '../servicio/servicio';

@IonicPage()
@Component({
  selector: 'page-detallenoti',
  templateUrl: 'detallenoti.html',
})
export class DetallenotiPage {
  
  public noti:any;
   public TAG: string = 'DetallenotiPage';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.noti = navParams.data;
  }

  show(){
    this.navCtrl.push(ServicioPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallenotiPage');
  }

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

}
