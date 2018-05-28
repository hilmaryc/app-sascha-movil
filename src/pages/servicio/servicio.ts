import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavParams, NavController } from 'ionic-angular';

import { AppservicioProvider } from '../../providers/appservicio/appservicio';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { MiserviciosProvider } from '../../providers/miservicios/miservicios';
import { PromocionesProvider } from '../../providers/promociones/promociones';

@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html'
})
export class ServicioPage {

  public TAG: string = 'ServicioPage ';
  seg_servicio;
  ico='arrow-dropup';
  myInput='';

  public services: any[]=[];
  public aux_services: any[]=[];
  public promos: any[]=[];

  private esMiServicio: boolean = false;
  public titulo_servicio: any = 'Servicios';
  
  public valoracion: any = [{
    "id":"1",
    "criterio":"malo"
    },{
    "id":"2",
    "criterio":"regular"
  }];

  errorMessage: string;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public serviApp: AppservicioProvider,
    public serviciosProv: ServiciosProvider,
    public miserviciosProv: MiserviciosProvider,
    public promocionesProv: PromocionesProvider) { }

  ngOnInit(){
    this.seg_servicio = "servi";
    this.getServicios();
  }

  async getServicios(): Promise<void> {
    let metodo = ': metodo getServicios';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.serviciosProv.getAll()
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,this.TAG + metodo);
        this.titulo_servicio = "Servicios";
        this.ico = 'arrow-dropup';
        this.cargarServicios(res['data'],this.titulo_servicio);
        this.esMiServicio = false;
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  cargarServicios(servicios,tipo){
    let array:any[] = servicios;
   // console.log(this.TAG+'metodo: cargarServicios: '+ JSON.stringify(array));
    this.services = [];
    for (var i = array.length - 1; i >= 0; i--) {
      if (tipo == 'Servicios')
        this.services.push({
          "servicio": array[i],
          "estado_orden_servicio": 0
        });
      if (tipo == 'Mis Servicios' || tipo == 'Mi Servicio')
        this.services.push({
          "servicio": array[i].servicio,
          "estado_orden_servicio": array[i].estado_orden_servicio
        });
    }
    this.aux_services = this.services;
  }

  async getCliente(){
    let metodo = ': metodo getCliente';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.storage.ready().then(() => {
    this.storage
      .get('usuario')
      .then( (usuario) => {
        this.serviApp.activarProgreso(false,this.TAG + metodo);
        this.getMiServicios(usuario.data.cliente.id_cliente)
      })
      .catch((err) =>{
        this.serviApp.errorConeccion(err);
      });
    });
  }

  async getMiServicios(id): Promise<void> {
    let metodo = ': metodo getMiServicios';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.miserviciosProv.get(id)
      .subscribe(
      (res)=>{
        if ( res['data'].length == 1 ) this.titulo_servicio = "Mi Servicio"
        else this.titulo_servicio = "Mis Servicios";
        this.ico = 'arrow-dropdown';
        this.cargarServicios(res['data'],this.titulo_servicio);
        this.esMiServicio = true;
        this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getPromociones():Promise<void>{
    let metodo = ': metodo getPromociones';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.promocionesProv.getAll()
    .subscribe(
      (res)=>{
        this.promos = res['data'];
        this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

  showSegment(segment){
    if ( segment == 'servi' && this.services.length == 0 ) this.getServicios();
    if ( segment == 'promocion' && this.promos.length == 0 ) this.getPromociones();
  }

  showFilter() {
    let modal = this.modalCtrl.create('FiltroPage');
    modal.present();
  }

  showServicio() {
    if(this.esMiServicio) this.getServicios();  
    else this.getCliente();
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

  getItems(ev: any) {
    let val = ev.target.value;
    this.services = this.aux_services;
    if (val && val.trim() != '') {  
      this.services = this.services.filter((item) => {
        return (item.servicio.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
  }

  onCancel(ev: any){
    this.myInput = '';
    this.services = this.aux_services;
  }

}