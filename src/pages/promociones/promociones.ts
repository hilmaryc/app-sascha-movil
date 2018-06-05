import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {

   public promo:any = null;
  
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) { }

  ngOnInit(){
    this.promo = this.navParams.data;
    console.log(JSON.stringify(this.promo))
  }

  solicitar(){
     var msg = 'La Promocion tiene un costo por ' + this.promo.precio + ' Desea solicitarlo?'
    let alert = this.alertCtrl.create({
      title:    'Mensaje',
      subTitle: msg ,
      buttons:  [{
        text: "SI",
        handler: data => {
          console.log('Accion SI' + data)
        } 
      } , {
        text: "NO",
        handler: data => {
          console.log('Accion NO')
        } 
      }]
    });
    alert.present();
    this.dismiss()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
