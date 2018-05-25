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
  public services: any[]=[];
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
    private storage: Storage,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public params: NavParams, 
    public serviApp: AppservicioProvider,
    public serviciosProv: ServiciosProvider,
    public miserviciosProv: MiserviciosProvider,
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
        let array:any[] = res['data'];
        for ( let i in array ){
          this.services.push({
            "servicio": array[i],
            "estado": 0
          });
        }
        this.esMiServicio = false;
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getCliente(){
    this.serviApp.activarProgreso(true,'ServicioPage: metodo getCliente');
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.serviApp.activarProgreso(false,'ServicioPage: metodo getCliente');
              this.getMiServicios(usuario.data.cliente.id_cliente)
          })
          .catch((err) =>{
            this.serviApp.errorConeccion(err);
          });
    });
  }

  async getMiServicios(id): Promise<void> {
    this.serviApp.activarProgreso(true,'ServicioPage: metodo getMiServicios');
    await this.miserviciosProv.get(id)
      .subscribe(
      (res)=>{
        if ( res['data'].length == 1 ) this.titulo_servicio = "Mi Servicio"
        else this.titulo_servicio = "Mis Servicios";
        this.ico = 'arrow-dropdown';
        this.services = res['data'];
        this.esMiServicio = true;
        this.serviApp.activarProgreso(false,'ServicioPage: metodo getMiServicios');
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

  ionViewDidEnter(){
    console.log(this.TAG,' showDetail ');
  }
}