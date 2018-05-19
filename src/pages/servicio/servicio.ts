import { Component } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';

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
  ico='arrow-dropup';
  public services: any[]=[{
    nombre:"",
    url_imagen:"",
    descripcion:""
  }];
  public miservices: any[]=[];
  private esMiServicio: boolean = false;
  public titulo_servicio: any = 'Servicios';
  public promos: any[]=[];
  
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
    public serviApp: AppservicioProvider,
    public serviciosProv: ServiciosProvider,
    public promocionesProv: PromocionesProvider) { 
    this.seg_servicio = "servi";
  }

  ngOnInit(){
    this.getServicios();
  }

  ionViewDidLoad(): void {
    console.log(this.TAG);
  }

  async getServicios(): Promise<void> {
    this.serviApp.activarProgreso(true,'servicio: metodo getServicios');
    await this.serviciosProv.getAll()
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'servicio: metodo getServicios');
        this.titulo_servicio = "Servicios";
        this.ico = 'arrow-dropup';
        this.services = res['data'];
        this.esMiServicio = false;
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getMiServicios(): Promise<void> {
    this.serviApp.activarProgreso(true,'servicio: metodo getMiServicios');
    await this.serviciosProv.getAll()
      .subscribe(
      (res)=>{
        if ( res['data'].length == 1 ) this.titulo_servicio = "Mi Servicio"
        else this.titulo_servicio = "Mis Servicios";
        this.ico = 'arrow-dropdown';
        this.services = res['data'];
        this.esMiServicio = true;
        this.serviApp.activarProgreso(false,'servicio: metodo getMiServicios');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getPromociones():Promise<void>{
    this.serviApp.activarProgreso(true,'servicio: metodo getPromociones');
    await this.promocionesProv.getAll()
    .subscribe(
      (res)=>{
        this.promos = res['data'];
        this.serviApp.activarProgreso(false,'servicio: metodo getPromociones');
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
    let modal = this.modalCtrl.create('FiltroPage');
    modal.present();
  }

  showServicio() {
    if(this.esMiServicio) this.getServicios();  
    else this.getMiServicios();
  }

  showDetail(params){
    this.navCtrl.push('ServicioDetallePage', {
      "titulo_servicio": this.titulo_servicio,
      "servicio": params
    });
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

  verPromocion(promo){
    this.navCtrl.push('PromocionesPage',promo)
  }

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }
}