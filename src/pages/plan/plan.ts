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
        this.servicio = res['data'].servicio;
        if ( res['data'].servicio.plan_suplemento != null )
          this.suplementos = res['data'].servicio.plan_suplemento.suplementos;
        if ( res['data'].servicio.plan_ejercicio != null )
          this.actividades = res['data'].servicio.plan_ejercicio.ejercicios;
        if ( res['data'].servicio.plan_dieta != null )
          this.comidas = res['data'].servicio.plan_dieta.comidas;
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }
  
 openModal(characterNum) {
    let modal = this.modalCtrl.create('ModalContentPage', characterNum);
    modal.present();
 }

}