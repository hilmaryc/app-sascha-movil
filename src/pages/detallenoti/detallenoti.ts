import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetallenotiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallenotiPage');
  }

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }

}
