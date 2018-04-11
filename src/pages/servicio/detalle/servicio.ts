import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  ViewController,
  NavParams,
  ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {

  public servicio: any;

  public detalle:any = {
    "titulo": "Consulta Nutricional",
    "img": "../../assets/imgs/consulta.jpg",
    "info": "En la primera cita, el nutricionista realizará tu historia clínica, revisando tus problemas de salud, antecedentes familiares, cirugías, suplementación y medicación, etc. Revisará contigo tu estilo de vida, tu tipo de trabajo, actividad física y deporte que realizas, horarios y demás aspectos de interés.",
    "precio": "Precio $100"
  };
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    this.servicio = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioDetallePage');
  }

  solicitar(){
      console.log('solicitar');
      let toast = this.toastCtrl.create({
        message: 'Su solicitud fue enviada',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.dismiss();
      });

      toast.present();
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
