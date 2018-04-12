import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  ViewController,
  NavParams,
  AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {
  public TAG: string = 'ServicioDetallePage';
  public servicio: any;
  public nutricionistas: any = [{
    "nombre":"Jose Coronel"
  } , {
    "nombre":"Dario Suarez"
  } , {
    "nombre":"Daniel Montero"
  }];
  public horas: any = [{
    "bloque":"7:00 a 9:00"
  } , {
    "bloque":"9:00 a 12:00"
  } , {
    "bloque":"2:00 a 4:00"
  } , {
    "bloque":"4:00 a 6:00"
  } , {
    "bloque":"6:00 a 8:00"
  } , {
    "bloque":"8:00 a 10:00"
  }];
  public motivos: any = [{
    "motivo":"Primera visita"
  } , {
    "motivo":"Reinsidencia visita"
  }];
  public nutricionista:any;
  public hora:any;
  public motivo:any;
  public itemSelect:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.servicio = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioDetallePage');
  }

  solicitar(){
    let alert = this.alertCtrl.create({
      title:    'Mensaje',
      subTitle: 'Su peticion ha sido enviada exitosamente!',
      buttons:  ['OK']
    });
    alert.present();
    this.dismiss()
  }
  itemView(item){
    console.log(this.TAG,' Item Seleccionado: ' + JSON.stringify(item));
    this.itemSelect = item;
  }
  selectNutricionista(){
    this.nutricionista=this.itemSelect;
    console.log(this.TAG,' Nutricionista Seleccionado: ' + JSON.stringify(this.nutricionista));
  }
  selectHora(){
    this.hora=this.itemSelect;
    console.log(this.TAG,' Hora Seleccionado: ' + JSON.stringify(this.hora));
  }
  selectMotivo(){
    this.motivo=this.itemSelect;
    console.log(this.TAG,' Motivo Seleccionado: ' + JSON.stringify(this.motivo.motivo));
  }
  calendar(){
    console.log(this.TAG,' Calendar: '); 
  }
  dismiss() {
   this.viewCtrl.dismiss();
  }
}
