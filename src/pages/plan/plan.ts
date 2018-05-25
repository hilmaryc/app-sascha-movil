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

  actividades:any = [];

  comidas:any = [];

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
            console.log(JSON.stringify(err));
          });
    });
  }

  async getPlanes(id): Promise<void> {
    this.serviApp.activarProgreso(true,'PlanPage: metodo getPlanes');
    await this.planesProv.get(id)
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'PlanPage: metodo getPlanes');
        this.servicio = res['data'].servicio;
        this.suplementos = res['data'].servicio.plan_suplemento.suplementos;
        this.actividades = res['data'].servicio.plan_ejercicio.ejercicios;
        this.comidas = res['data'].servicio.plan_dieta.comidas;
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