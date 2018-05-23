import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { EvolucionesProvider } from '../../providers/evoluciones/evoluciones';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan-nutricional.html',
})
export class PlanPage {
  plan;

  public servicio:any[] = [];

  suplementos:any = [];

  actividades:any = [{
    "nombre":"Caminar",
    "cantidad": 1,
    "unidad":"hora"
  } , {
    "nombre":"Correr",
    "cantidad": 2,
    "unidad":"kilometros"
  } , {
    "nombre":"Ejercicio de piernas",
    "cantidad": 30,
    "unidad":"minutos"
  } , {
    "nombre":"Ejercicio de brazos",
    "cantidad": 30,
    "unidad":"minutos"
  }];

  constructor(
    private storage: Storage,
    public modalCtrl: ModalController, 
    public navCtrl: NavController,
    public planesProv: EvolucionesProvider,
    public serviApp: AppservicioProvider) {
    this.plan = "comida";
  }

 ionViewDidEnter(){
    this.getCliente();
  }

  async getCliente(){
    this.serviApp.activarProgreso(true,'PlanPage: metodo getCliente');
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.serviApp.activarProgreso(false,'PlanPage: metodo getCliente');
            this.getPlanes(usuario.data.cliente.id_cliente);
          })
          .catch((err) =>{
            this.serviApp.errorConeccion(err);
          });
    });
  }

  async getPlanes(id): Promise<void> {
    this.serviApp.activarProgreso(true,'PlanPage: metodo getPlanes');
    await this.planesProv.get(id)
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'PlanPage: metodo getPlanes');
        this.servicio = res['data'].orden_servicio.servicio;
        this.suplementos = res['data'].orden_servicio.servicio.plan_suplemento.suplementos;
        this.actividades = res['data'].orden_servicio.servicio.plan_ejercicio.ejercicios;
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

 openModal(characterNum) {
    let modal = this.modalCtrl.create('ModalContentPage', characterNum);
    modal.present();
 }

}