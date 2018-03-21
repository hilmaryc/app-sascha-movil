import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { LoadingController } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public proveedor: RemoteProvider) { 
    //, private load : LoadingController
  }

  ionViewDidEnter(){
/*
  let progress = this.load.create({
      content: 'Please wait…'
    });

  progress.present();
*/

/*
  this.proveedor.getUsers()
       .subscribe(
        (data)=>{
          this.users = data;
  //        progress.dismiss();
          console.log(" POLICIA");
          console.log(data);
        },
        (error)=>{console.log(error);}
       
       )
*/
  }

}