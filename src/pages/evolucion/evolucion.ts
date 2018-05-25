import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { PerfilesProvider } from '../../providers/perfiles/perfiles';
import { AppservicioProvider } from '../../providers/appservicio/appservicio';

@IonicPage()
@Component({
  selector: 'page-evolucion',
  templateUrl: 'evolucion.html',
})
export class EvolucionPage {
  evolucion;
  public data:any;
  testCheckboxOpen: boolean;
  testCheckboxResult;

  public id_cliente:string='';
  public perfiles: any[]=[];

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
    public serviApp: AppservicioProvider ) {
    this.evolucion = "perfil";
  }

  ionViewDidLoad(): void {
    this.getCliente();
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
  public event(data: Date): void {
    this.localDate = data;
  }

  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }

  doCheckbox() {
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

  verMeta(){
     this.navCtrl.push('MetaPage');
  }
}
