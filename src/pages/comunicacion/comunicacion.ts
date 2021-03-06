import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';
import { CanalescuchaProvider } from '../../providers/canalescucha/canalescucha';
import { ServicioPage } from '../servicio/servicio';
@IonicPage()
@Component({
  selector: 'page-comunicacion',
  templateUrl: 'comunicacion.html'
})
export class ComunicacionPage {

  public body:any = {
    "id_cliente":null,
    "id_motivo":null,
    "contenido": ""
  };

  public motivos:any;
  public canales:any;
  public tipo_contacto:string = 'Mensaje';

  constructor(
    private storage: Storage,
    public navCtrl:   NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public serviApp: AppservicioProvider,
    public canalescuchaProv: CanalescuchaProvider
  ) { }

  ngOnInit(){
    this.getCliente();
    this.getCanales();
  }

  async getCanales():Promise<void>{
    this.serviApp.activarProgreso(true,'ComunicacionPage: metodo getCanales');
    await this.canalescuchaProv.getAll()
    .subscribe(
      (res)=>{
        this.canales = res['data'];
        this.serviApp.activarProgreso(false,'ComunicacionPage: metodo getCanales');
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

  async getCliente() {
    await this.storage.ready().then(() => {
      this.storage.get('usuario').then( (usuario) => {
      this.body.id_cliente = usuario.data.cliente.id_cliente;
      }).catch((err) =>{
          this.serviApp.errorConeccion(err);
      });
    });
  }

  selectView(entidad,data){
    if (entidad == 'motivos') {
      this.motivos = data.motivos;
      this.tipo_contacto = data.nombre;
    }
    if (entidad == 'motivo' ) this.body.id_motivo = data.id_motivo;
  }

  esValido(){
    console.log(JSON.stringify(this.body.contenido));
    if (this.body.id_motivo == null) {
      this.serviApp.alecrtMsg('Seleccione el tipo contacto y el motivo');
      return false;
    }
    if (this.body.contenido == "") {
      this.serviApp.alecrtMsg('Por favor escriba su comentario');
      return false;
    }
    if (this.body.id_cliente == null) {
      this.serviApp.alecrtMsg('El cliente no esta disponible inicie sesion nuevamente');
      return false;
    }
    return true;
  }

  async enviar(){
    this.serviApp.activarProgreso(true,'ComunicacionPage: metodo enviar');
    if (this.esValido()){
      console.log(JSON.stringify(this.body));
     await this.canalescuchaProv.create(this.body)
      .subscribe(
        (res)=>{
          this.serviApp.alecrtMsg('Su '+ this.tipo_contacto +' ha sido enviada exitosamente!');
          this.navCtrl.push(ServicioPage);
        },
        (error)=>{
          this.serviApp.errorConeccion(error);
        }
      ); 
    }
  }

  verNotificaciones(){
     this.navCtrl.push('NotificacionesPage');
  }

}
