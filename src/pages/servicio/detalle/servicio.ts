import { Component } from '@angular/core';
import { 
  ModalController, 
  NavController, 
  ViewController,
  NavParams,
  AlertController } from 'ionic-angular';
import { SolicitudPage } from '../solicitud/solicitud'
import { NotificacionesPage } from '../../notificaciones/notificaciones';

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
      "detalle": "Mejora tu rendimiento deportivo."
    } , {
      "detalle": "Plan nutricional personalizado para tu entrenamiento."
    } , {
      "detalle": "Aprende a adaptar tu alimentación al deporte que realizas."
    } , {
      "detalle": "Dieta equilibrada y comiendo de todo."
    } , {
      "detalle": "Sin pastillas, complementos, o exceso de proteinas."
    } , {
      "detalle": "Diseñado por nutricionistas y endocrinos de prestigio."
    } , {
      "detalle": "Dieta flexible, variada y sin menús cerrados."
    }];
    var contenido2: any = [{
      "detalle": "Come de todos los alimentos y Adelgaza sin pasar hambre."
    } , {
      "detalle": "Dieta sana  y Equilibrada para controlar tu peso sin Productos ni Pastillas."
    } , {
      "detalle": "Flexibilidad total: Dietas para controlar tu peso sin menús cerrados."
    } , {
      "detalle": "Flexibilidad total: Dietas para controlar tu peso sin menús cerrados."
    } , {
      "detalle": "Baja de peso sin efecto rebote."
    } , {
      "detalle": "Aprende a comer sano"
    } ];
    var contenido3: any = [{
      "detalle": "Aprende a comer con expertos en Nutrición."
    } , {
      "detalle": "Dieta flexible para aprender a comer sin menús cerrados."
    } , {
      "detalle": "Aprende a controlar con facilidad la ansiedad con la comida."
    } , {
      "detalle": "Aprende a comer sin pastillas ni productos de dudosa composición."
    } , {
      "detalle": "Aprende a comer sin trucos: mejora tu alimentación."
    }];
    var contenido4: any = [{
      "detalle": "Enseñamos a tu hijo a comer sano y equilibrado."
    } , {
      "detalle": "Tu hijo y tu aprenderan a controlar su peso."
    } , {
      "detalle": "Pautas nutricionales adaptadas a cada rango de edad."
    } , {
      "detalle": "Integramos hábitos familiares, ejercicio y motivación."
    }];
    var contenido5: any = [{
      "detalle": "Gana peso de forma saludable."
    } , {
      "detalle": "Sin pastillas ni complementos: Ganarás peso de manera natural."
    } , {
      "detalle": "Dieta equilibrada para Ganar Peso."
    } , {
      "detalle": "Flexibilidad total, sin menús cerrados."
    }];
    var contenido6: any = [{
      "detalle": "Control del peso durante el embarazazo en un contexto de salud."
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

  verNotificaciones(){
     this.navCtrl.push(NotificacionesPage);
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
