import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

import { AppservicioProvider } from '../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
  public TAG: string = 'NotificacionesPage';
  
  public notificaciones: any[] = [];
  public subscription;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public serviApp: AppservicioProvider) { }

  stopTheIterations () {
    this.subscription.unsubscribe ();
  }

  ngOnInit() {
    this.subscription = Observable.interval(2500).subscribe(x => {
      this.getNotificaciones();
    });
  }

  getNotificaciones(){
    this.storage.ready().then(() => {
      this.storage.get('notificaciones').then( (data) => {
        //console.log(this.TAG,JSON.stringify(data)+'notificaciones');
        this.notificaciones = data;
      }).catch((err) =>{
        console.log(err);
      });
    });
  }
  
  showDetail(params){
    console.log(this.TAG,' showDetail ' + JSON.stringify(params));
    this.navCtrl.push('DetallenotiPage', params );
  }
}
