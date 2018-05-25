import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, AlertController, ModalController, NavController, ViewController, NavParams } from 'ionic-angular';

import { OrdenProvider } from '../../../providers/orden/orden';
import { ReclamosProvider } from '../../../providers/reclamos/reclamos';
import { TiporeclamosProvider } from '../../../providers/tiporeclamos/tiporeclamos';
import { MiordenserviciosProvider } from '../../../providers/miordenservicios/miordenservicios';
import { AppservicioProvider } from '../../../providers/appservicio/appservicio';


@IonicPage()
@Component({
  selector: 'page-detalle-servicio',
  templateUrl: 'detalle-servicio.html',
})
export class ServicioDetallePage {
  public TAG: string = 'ServicioDetallePage';
  public servicio: any = null;
  public titulo_servicio: any = 'Servicios';
  public id_cliente: string = '';
  public id_orden_servicio: string = '';

  constructor(
    private storage: Storage,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public tiporeclamosProv: TiporeclamosProvider,
    public reclamosProv: ReclamosProvider,
    public ordenServiciosProv: MiordenserviciosProvider,
    public ordenProv: OrdenProvider,
    public serviApp: AppservicioProvider) {

    let data = navParams.data;
    console.log(JSON.stringify(data));
    if (JSON.stringify(data) != {})
    {
      this.servicio = data.servicio;
      let titilo = navParams.data.titulo_servicio;
      if ( titilo == "Mi Servicio") this.titulo_servicio = "Mi Servicio"
      else if ( titilo == "Mis Servicios") this.titulo_servicio = "Mi Servicio"
      else this.titulo_servicio = navParams.data.titulo_servicio;
    }
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

  ionViewDidLoad() {
    this.getCliente()
   }

  solicitar(servicio){
    this.navCtrl.push( 'SolicitudPage', servicio );
  }

  async getCliente(){
    this.serviApp.activarProgreso(true,'ServicioDetallePage: metodo getCliente');
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo getCliente');
            this.id_cliente = usuario.data.cliente.id_cliente;
          })
          .catch((err) =>{
            console.log(JSON.stringify(err));
          });
    });
  }

  async getTipoReclamos(): Promise<void> {
    this.serviApp.activarProgreso(true,'ServicioDetallePage: metodo getTipoReclamos');
    await this.tiporeclamosProv.getAll()
      .subscribe(
      (res)=>{
          console.log(res['data'])
         let objetos: any[] = res['data'].motivos || [];
          console.log(res['data'].motivos)
          if (objetos.length != 0){
            let myImputs:any =[];
            for ( let i in objetos ){
              let data:any = { 
                type: 'radio',
                label: objetos[i].descripcion,
                value: objetos[i]
              };
              myImputs.push(data);
            }
            this.alertSelection(myImputs);
          }
        this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo getTipoReclamos');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  solicitarPromocion_Garantia(servicio){
    console.log(JSON.stringify(servicio))
  }

  alertSelection(myImputs){
   let editar = this.alertCtrl.create({
      title: 'Por que deseas cancelar el servicio?',
      inputs: myImputs,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if( '['+JSON.stringify(data)+']' != '[undefined]') this.cancelar(data);
            else this.serviApp.alecrtMsg('Seleccione un motivo');
          }
        }
      ]
    });
    editar.present();
  }

  async cancelar(data){
    await this.getMiOrdenServicios(this.id_cliente,data.id_motivo);
  }

  async getMiOrdenServicios(id_cliente, id_motivo): Promise<void> {
    this.serviApp.activarProgreso(true,'ServicioDetallePage: metodo getMiOrdenServicios');
    await this.ordenServiciosProv.get(id_cliente)
      .subscribe(
      (res)=>{
        let orden_servicios = res['data'];
        this.id_orden_servicio = orden_servicios[0];
         this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo getMiOrdenServicios');
        if ( this.id_cliente != '' && this.id_orden_servicio != '' ){
          this.reclamar({
            "id_motivo": id_motivo,
            "id_orden_servicio": this.id_orden_servicio
          });
        }
        this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo getMiOrdenServicios');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async reclamar(body){
    this.serviApp.activarProgreso(true,'ServicioDetallePage: metodo reclamar');
    await this.reclamosProv.create(body).subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo reclamar');
        this.procederCancelacion(this.id_orden_servicio,{
          "estado": 4
        });  
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );
  }

  procederCancelacion(id,body) {   
    let alert = this.alertCtrl.create({
      title:    'Esta seguro de cancelar el servicio',
      subTitle: 'Su reclamo ya fue enviado' ,
      buttons:  [{
        text: "SI",
        handler: data => {
          this.cancelarServ(id,body);
        } 
      } , {
        text: "NO",
        handler: data => {
          this.serviApp.alecrtMsg('Su servicio no se cancelo');
        } 
      }]
    });
    alert.present(); 
  }

  async cancelarServ(id,body){
    this.serviApp.activarProgreso(true,'ServicioDetallePage: metodo cancelarServ');
    await this.ordenProv.update(id,body)
    .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'ServicioDetallePage: metodo cancelarServ');
        this.serviApp.alecrtMsg('Su servicio se cancelo exitosamente');
        this.dismiss();
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
