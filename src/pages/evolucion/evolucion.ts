import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { MiordenserviciosProvider } from '../../providers/miordenservicios/miordenservicios';
import { TipoincideciasProvider } from '../../providers/tipoincidecias/tipoincidecias';
import { ProximavisitaProvider } from '../../providers/proximavisita/proximavisita';
import { VisitasProvider } from '../../providers/visitas/visitas';
import { PerfilesProvider } from '../../providers/perfiles/perfiles';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-evolucion',
  templateUrl: 'evolucion.html',
})
export class EvolucionPage {

  public TAG:string = 'EvolucionPage';

  evolucion;
  public data:any;
  testCheckboxOpen: boolean;
  testCheckboxResult;

  public id_cliente:string = null;
  public perfiles: any[]=[];
  public visitas: any[]=[];
  public proximaVisita: any=null;
  public numeroVisita: number = 1;

  public fecha: Date = new Date();
  public min: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 800));

  constructor(
    private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public perfilesProv: PerfilesProvider,
    public tipoincidenciasProv: TipoincideciasProvider,
    public visitasProv: VisitasProvider,
    public proximaVisitaProv: ProximavisitaProvider,
    public ordenServiciosProv: MiordenserviciosProvider,
    public serviApp: AppservicioProvider ) { 
    console.log(moment.locale())
  }

  ngOnInit(){
    this.evolucion = "perfil";
    this.getCliente();
  }
    
  showSegment(segment){
    if ( segment == 'perfil' && this.perfiles.length == 0 ) this.getCliente();
    if ( segment == 'visita' && this.id_cliente != null && this.visitas.length == 0 ) 
      this.getMiOrdenServicios();
  }

  async getCliente(){
    let metodo = ': metodo getCliente';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.getPerfiles(usuario.data.cliente.id_cliente);
            this.id_cliente = usuario.data.cliente.id_cliente;
          })
          .catch((err) =>{
            this.serviApp.errorConeccion(err);
          });
    });
  }

  async getPerfiles(id): Promise<void> {
    let metodo =':metodo getPerfiles';
    await this.perfilesProv.get(id)
      .subscribe(
      (res)=>{
        this.perfiles = res['data'];
        if ( this.perfiles.length == 0 ) 
          this.serviApp.alecrtMsg('Acude a tu cita para que te asigne un perfil');
        this.serviApp.activarProgreso(false,this.TAG + metodo);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getMiOrdenServicios(): Promise<void> {
    let metodo = ': metodo getMiOrdenServicios';
    if ( this.id_cliente != null ){
      this.serviApp.activarProgreso(true,this.TAG + metodo);
      await this.ordenServiciosProv.get(this.id_cliente)
      .subscribe(
        (res)=>{
          let orden_servicios = res['data'];
          if ( this.id_cliente || orden_servicios[0] )
            this.getVisitas(this.id_cliente,orden_servicios[0]);
        },
        (error)=>{
          this.serviApp.errorConeccion(error);
        }
      );    
    }
  }

  async getVisitas(id_cliente,id_orden_servicio): Promise<void> {
    this.serviApp.activarProgreso(true,'EvolucionPage: metodo getVisitas');
    await this.visitasProv.getBody({
        "id_cliente": id_cliente,
        "id_orden_servicio": id_orden_servicio
      })
      .subscribe(
      (res)=>{
        this.visitas = res['data'];
        for ( let i in this.visitas ){
          this.numeroVisita = this.numeroVisita + 1;
          this.visitas[i].fecha_atencion = moment(this.visitas[i].fecha_atencion).format("DD/MM/YYYY");
        }
        
        //this.visitas.splice(0, 1);
        this.getProximaVisita(this.id_cliente);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getProximaVisita(id_cliente): Promise<void> {
    await this.proximaVisitaProv.get(id_cliente)
      .subscribe(
      (res)=>{
        this.proximaVisita = res['data'];
        this.setDate(new Date(this.proximaVisita.fecha));
        this.serviApp.activarProgreso(false,'EvolucionPage: metodo getProximaVisita');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  public Log(stuff): void {
    console.log(stuff);
  }

  public event(data: Date): void {}

  setDate(date: Date) {
    if( date != this.fecha ){
      this.fecha = date;
    }
  }

  async getTipoIncidencias(): Promise<void> {
    let metodo = ': metodo getTipoIncidencias';
    this.serviApp.activarProgreso(true,this.TAG + metodo);
    await this.tipoincidenciasProv.getAll()
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

  alertSelection(myImputs){
   let editar = this.alertCtrl.create({
      title: 'Por que deseas reprogramar la fecha?',
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
            if( '['+JSON.stringify(data)+']' != '[undefined]') this.reprogramar(data);
            else this.serviApp.alecrtMsg('Seleccione un motivo');
          }
        }
      ]
    });
    editar.present();
  }

  reprogramar(data){
    console.log('reprogramar clicked' + JSON.stringify(data) );
  }

  doCheckbox(visita) {
    let alert = this.alertCtrl.create();
    alert.setTitle('¡Por favor valore su visita realizada!');

    alert.addInput({
      type: 'checkbox',
      label: 'Excelente',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Bueno',
      value: 'value2'
    });

    alert.addInput({
      type: 'radio',
      label: 'Regular',
      value: 'value3'
    });

    alert.addInput({
      type: 'radio',
      label: 'Deficiente',
      value: 'value4'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'ENVIAR',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.navCtrl.push('DetalleEvolucionPage',visita.id_visita);
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

  verMeta(metas){
     this.navCtrl.push('MetaPage',metas);
  }
}
