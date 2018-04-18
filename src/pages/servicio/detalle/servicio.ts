import { Component } from '@angular/core';
import { 
  ModalController, 
  NavController, 
  ViewController,
  NavParams,
  AlertController } from 'ionic-angular';
import { SolicitudPage } from '../solicitud/solicitud'

@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {
  public TAG: string = 'ServicioDetallePage';
  public servicio: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.servicio = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioDetallePage');
  }

  solicitar(){
    this.navCtrl.push(SolicitudPage, this.servicio );
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
