import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilesProvider } from '../../../providers/perfiles/perfiles';
import { AppservicioProvider } from '../../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-detaevo',
  templateUrl: 'meta.html',
})
export class MetaPage {
  
  public data:any;

  public id_cliente:string='';
  public perfiles: any[]=[];

  
  constructor( private storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public perfilesProv: PerfilesProvider,
    public serviApp: AppservicioProvider) {

    this.getPerfiles();
  }

  ionViewDidLoad(): void {
    this.getPerfiles();
  }
    
  async getCliente(){
    this.serviApp.activarProgreso(true,'EvolucionPage: metodo getCliente');
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
            this.serviApp.activarProgreso(false,'EvolucionPage: metodo getCliente');
              this.id_cliente = usuario.data.cliente.id_cliente;
              this.getPerfiles(this.id_cliente)
          })
          .catch((err) =>{
            this.serviApp.errorConeccion(err);
          });
    });
  }

  async getPerfiles(id): Promise<void> {
    this.serviApp.activarProgreso(true,'EvolucionPage: metodo getPerfiles');
    await this.perfilesProv.get(id)
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false,'EvolucionPage: metodo getPerfiles');
        this.perfiles = res['data'];
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  public Log(stuff): void {
    console.log(stuff);
  }

}
