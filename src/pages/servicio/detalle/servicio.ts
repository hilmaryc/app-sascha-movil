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
  public contenidos: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
    this.servicio = navParams.data;
    
    var contenido1: any = [{
      "detalle": "Plan personalizado para adultos mayores."
    } , {
      "detalle": "Mejora tu condicion fisica."
    } , {
      "detalle": "Aprende a adaptar tu alimentación y actividades fisicas."
    } , {
      "detalle": "Diseñado por nutricionistas y endocrinos."
    }];
    var contenido2: any = [{
      "detalle": "Controla tu peso comiendo los alimentos adecuados."
    } , {
      "detalle": "Dieta sana  y Equilibrada para controlar ansiedad."
    } , {
      "detalle": "plan de actividades, alimentacion y suplementos."
    } , {
      "detalle": "Asesoria constante."
    } ];
    var contenido3: any = [{
      "detalle": "Aprende a comer con expertos en Nutrición."
    } , {
      "detalle": "Dieta adaptada a tus necesidades fisicas."
    } , {
      "detalle": " Mejora tu rendimiento con la alimentacion adecuada."
    } , {
      "detalle": "Aprende a comer de acuerdo a tu actividad deportiva."
    }];
    var contenido4: any = [{
      "detalle": "Te enseñamos a mejorar la alimentacion de tu hijo."
    } , {
      "detalle": "Recibe recomendaciones para disminuir el consumo de dulces."
    } , {
      "detalle": "Pautas nutricionales adaptadas a las necesidades."
    } , {
      "detalle": "Integramos hábitos familiares, ejercicio y motivación."
    }];
    var contenido5: any = [{
      "detalle": "Gana peso de forma saludable."
    } , {
      "detalle": "Mejora tu alimentacion y combina de manera optima tus actividades fisicas."
    } , {
      "detalle": "Dieta equilibrada y recomendaciones para Ganar Peso."
    } , {
      "detalle": "Visitas de seguimiento hasta alcanzar tu meta."
    }];
    var contenido6: any = [{
      "detalle": "Controla tu alimentacion durante el embarazazo."
    } , {
      "detalle": "Cubriendo las necesidades nutricionales de la madre y del bebé."
    } , {
      "detalle": "Come equilibradamente y sin pasar hambre durante la gestación."
    } , {
      "detalle": "Evita los riesgos del sobrepeso durante el embarazo."
    }];

    if( this.servicio.id == 1 ) {
      this.contenidos = contenido3;
    } else if( this.servicio.id == 2 ) {
      this.contenidos = contenido2;
    } else if( this.servicio.id == 3 ) {
      this.contenidos = contenido1;
    } else if( this.servicio.id == 4 ) {
      this.contenidos = contenido4;
    } else if( this.servicio.id == 5 ) {
      this.contenidos = contenido5;
    } else if( this.servicio.id == 6 ) {
      this.contenidos = contenido6;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicioDetallePage');
  }

  solicitar(){
    this.navCtrl.push( SolicitudPage, this.servicio );
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
