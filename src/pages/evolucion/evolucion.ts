import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { MiordenserviciosProvider } from '../../providers/miordenservicios/miordenservicios';
import { VisitasProvider } from '../../providers/visitas/visitas';
import { PerfilesProvider } from '../../providers/perfiles/perfiles';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';

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

  public localDate: Date = new Date();
  public initDate: Date = new Date(2018, 4, 15);
  public min: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 800));
  public disabledDates: Date[] = [new Date(2018, 3, 1), new Date(2018, 3, 3), new Date(2018, 3, 5)];
  public markDates: Date[] = [new Date(2018, 3, 2), new Date(2018, 3, 4), new Date(2018, 3, 6)];

  constructor(
    private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public perfilesProv: PerfilesProvider,
    public visitasProv: VisitasProvider,
    public ordenServiciosProv: MiordenserviciosProvider,
    public serviApp: AppservicioProvider ) { }

  ngOnInit(){
    this.evolucion = "perfil";
    this.getCliente();
  }
    
  showSegment(segment){
    if ( segment == 'perfil' && this.perfiles.length == 0 ) this.getCliente();
    if ( segment == 'visita' && this.id_cliente != null ) this.getMiOrdenServicios();
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
      await this.ordenServiciosProv.get(this.id_cliente)
      .subscribe(
        (res)=>{
          let orden_servicios = res['data'];
          this.serviApp.activarProgreso(false,this.TAG + metodo);
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
        this.cargarProximaVisita(this.visitas[0]);
        this.visitas.splice(0, 1);
        this.serviApp.activarProgreso(false,'EvolucionPage: metodo getVisitas');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  cargarProximaVisita(visita){
    this.proximaVisita = visita;
    this.setDate(new Date(visita.fecha_atencion));
  }

  public Log(stuff): void {
    console.log(stuff);
  }
  public event(data: Date): void {
    this.localDate = data;
  }

  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
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
        this.navCtrl.push('DetalleEvolucionPage');
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
