import { Component } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { AlertController, Loading, LoadingController } from 'ionic-angular';
import { FiltroPage } from '../../pages/servicio/filtro/filtro';
import { ServicioDetallePage } from '../../pages/servicio/detalle/servicio';
import { NotificacionesPage } from '../../pages/notificaciones/notificaciones';
import { PromocionesPage } from '../../pages/promociones/promociones';

import { AppservicioProvider } from '../../providers/appservicio/appservicio';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { PromocionesProvider } from '../../providers/promociones/promociones';

@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html'
})
export class ServicioPage {

  public TAG: string = 'ServicioPage ';
  seg_servicio;
  public loading: Loading;
  public services: any[];
  public promos: any[];
  
  public valoracion: any = [{
    "id":"1",
    "criterio":"malo"
    },{
    "id":"2",
    "criterio":"regular"
  }];

  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public serviApp: AppservicioProvider,
    public serviciosProv: ServiciosProvider,
    public promocionesProv: PromocionesProvider) { 
    this.seg_servicio = "servi";
    this.getServicios();
  }

  async getServicios(): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.serviciosProv.getAll()
      .subscribe(
      (res)=>{
        this.services = res['data'];
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getPromociones():Promise<void>{
    this.serviApp.activarProgreso(true);
    await this.promocionesProv.getAll()
    .subscribe(
      (res)=>{
        this.promos = res['data'];
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

  showSegment(){
    this.getPromociones();
  }

  showFilter() {
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }

  showDetail(params){
    console.log(this.TAG,' showDetail ' + JSON.stringify(params));
    this.navCtrl.push(ServicioDetallePage, params );
  }

  verNotificaciones(){
     this.navCtrl.push(NotificacionesPage);
  }

   verPromocion(promo){
     
     this.navCtrl.push(PromocionesPage,promo)

  }

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }

}