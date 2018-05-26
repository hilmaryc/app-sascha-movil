import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { ServicioPage } from '../../../pages/servicio/servicio';

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
    public navParams: NavParams,
    public tiporeclamosProv: TiporeclamosProvider,
    public reclamosProv: ReclamosProvider,
    public ordenServiciosProv: MiordenserviciosProvider,
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
    let metodo = ': metodo getCliente';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.storage.ready().then(() => {
    this.storage
      .get('usuario')
      .then( (usuario) => {
        this.serviApp.activarProgreso(false,this.TAG + metodo);
        this.id_cliente = usuario.data.cliente.id_cliente;
      })
      .catch((err) =>{
        this.serviApp.errorConeccion(err);
      });
    });
  }

  async getTipoReclamos(): Promise<void> {
    let metodo = ': metodo getTipoReclamos';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
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
      this.serviApp.activarProgreso(false,this.TAG + metodo);
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
    let metodo = ': metodo getMiOrdenServicios';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.ordenServiciosProv.get(id_cliente)
      .subscribe(
      (res)=>{
        let orden_servicios = res['data'];
        this.id_orden_servicio = orden_servicios[0];
        if ( this.id_cliente != '' && this.id_orden_servicio != '' ){
          this.reclamar({
            "id_motivo": id_motivo,
            "id_orden_servicio": this.id_orden_servicio
          });
        }
        this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async reclamar(body){
    let metodo = ': metodo reclamar';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.reclamosProv.create(body).subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,this.TAG + metodo);
        this.serviApp.alecrtMsg('Su reclamo ya fue enviado');
        this.navCtrl.push(ServicioPage);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );
  }

}
