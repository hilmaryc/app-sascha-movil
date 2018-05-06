import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, ViewController, NavParams } from 'ionic-angular';
import { NotificacionesPage } from '../../notificaciones/notificaciones';
import { AppservicioProvider } from '../../../providers/appservicio/appservicio';
import { BloquehorariosProvider } from '../../../providers/bloquehorarios/bloquehorarios';
import { EmpleadosProvider } from '../../../providers/empleados/empleados';
import { MotivosSolicitudProvider } from '../../../providers/motivos-solicitud/motivos-solicitud';
import { SolicitudesProvider } from '../../../providers/solicitudes/solicitudes';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-solocitud',
	templateUrl: 'solicitud.html',
})
export class SolicitudPage {
	public TAG: string = 'SolicitudPage ';

	public fecha: Date = new Date();
	public initDate2: Date = new Date(2015, 1, 1);	
	public min: Date = new Date()
	public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
	public disabledDates: Date[] = [new Date(2018, 3, 1), new Date(2018, 3, 3), new Date(2018, 3, 5)];
	public markDates: Date[] = [new Date(2018, 3, 2), new Date(2018, 3, 4), new Date(2018, 3, 6)];

	public solicitudes: any = [{
		"cliente":{},
		"servicio":{},
		"bloque_horario": {},
		"empleado":{},
		"motivo":{},
		"fecha": this.fecha
	}]

	constructor(
    private storage: Storage,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public modalCtrl: ModalController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public serviApp: AppservicioProvider,
		public horariosProv: BloquehorariosProvider,
		public empleadosProv: EmpleadosProvider,
		public motivosSolicitudProv: MotivosSolicitudProvider,
    public solicitudesProv: SolicitudesProvider) {
		this.solicitudes[0].servicio = navParams.data;
    this.getCliente();
	}

	seleccion(entidad,title) {
  	if ( entidad == 'bloque_horario' )
    	this.getBloqueHoras(entidad,title);
    else if ( entidad == 'empleado' )
    	this.getEmpleados(entidad,title);
    else if ( entidad == 'motivos-solicitud' )
    	this.getMotivoSolicitud(entidad,title);
	}

	async getBloqueHoras(entidad,title): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.horariosProv.getAll()
      .subscribe(
      (res)=>{
        let objetos: any[] = res['data'];
        let myImputs:any =[];
        for ( let i in objetos ){
          let checkeded: boolean = false;
          let valor = objetos[i].hora_inicio + ' - ' + objetos[i].hora_fin;
					let valor2 = this.solicitudes[0].bloque_horario.hora_inicio + ' - ' + this.solicitudes[0].bloque_horario.hora_fin;
          if ( valor == valor2 ) 
          	checkeded = true;
          let data:any = { 
            type: 'radio',
            label: valor,
            value: objetos[i],
            checked: checkeded 
          };
          myImputs.push(data);
        }
        this.alertSelection(entidad,title,myImputs);
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

	async getEmpleados(entidad,title): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.empleadosProv.getAll()
      .subscribe(
      (res)=>{
        let objetos: any[] = res['data'];
        let myImputs:any =[];
        for ( let i in objetos ){
          let checkeded: boolean = false;
          let valor = objetos[i].nombres;
					let valor2 = this.solicitudes[0].empleado.nombres;
          if ( valor == valor2 ) 
          	checkeded = true;
          let data:any = { 
            type: 'radio',
            label: valor,
            value: objetos[i],
            checked: checkeded 
          };
          myImputs.push(data);
        }
        this.alertSelection(entidad,title,myImputs);
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getMotivoSolicitud(entidad,title): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.motivosSolicitudProv.getAll()
      .subscribe(
      (res)=>{
        let objetos: any[] = res['data'];
        let myImputs:any =[];
        for ( let i in objetos ){
          let checkeded: boolean = false;
          let valor = objetos[i].descripcion;
					let valor2 = this.solicitudes[0].motivo.descripcion;
          if ( valor == valor2 ) 
          	checkeded = true;
          let data:any = { 
            type: 'radio',
            label: valor,
            value: objetos[i],
            checked: checkeded 
          };
          myImputs.push(data);
        }
        this.alertSelection(entidad,title,myImputs);
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getCliente(){
    this.serviApp.activarProgreso(true);
    await this.storage.ready().then(() => {
      this.storage.get('usuario').then( (usuario) => {
      this.serviApp.activarProgreso(false);
      console.log(this.TAG,JSON.stringify(usuario.data.cliente));
        this.solicitudes[0].cliente = usuario.data.cliente;
      }).catch((err) =>{
          console.log(err);
      });
    });
  }

  alertSelection(entidad,title,myImputs){
   let editar = this.alertCtrl.create({
      title: title,
      inputs: myImputs,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(entidad+ 'Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if ( entidad == 'bloque_horario' )
              this.solicitudes[0].bloque_horario = data;
            else if ( entidad == 'empleado' )
              this.solicitudes[0].empleado = data;
            else if ( entidad == 'motivos-solicitud' )
              this.solicitudes[0].motivo = data;
            else console.log('entidad no exite');
          }
        }
      ]
    });
    editar.present();
	}

  async solicitar(): Promise<void> {
     
    console.log(this.TAG,JSON.stringify(this.solicitudes[0].cliente));
    if(this.esValido(this.solicitudes[0]) == true){
    this.serviApp.activarProgreso(true);
    await this.solicitudesProv.create(this.solicitudes[0])
      .subscribe(
      (res)=>{
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );
    } else {
      console.log(this.TAG,JSON.stringify(this.solicitudes[0]));
    }
  }

  esValido(data): boolean{
    if ( JSON.stringify(this.solicitudes[0])=='{}' ) {
      this.serviApp.alecrtMsg('Seleccione todo los campos');
      return false;
    }
    if ( JSON.stringify(this.solicitudes[0].cliente)=='{}' ) {
      this.serviApp.alecrtMsg('El cliente es necesario');
      return false;
    }
    if ( JSON.stringify(this.solicitudes[0].empleado)=='{}' ) {
      this.serviApp.alecrtMsg('Seleccione el Nutricionista');
      return  false;
     } 
    if ( JSON.stringify(this.solicitudes[0].servicio)=='{}' ) {
      this.serviApp.alecrtMsg('Seleccione el servicio');
      return  false;
    }
    if ( JSON.stringify(this.solicitudes[0].bloque_horario)=='{}' ) {
      this.serviApp.alecrtMsg('Seleccione la hora');
      return  false;
    }
    if ( JSON.stringify(this.solicitudes[0].motivo)=='{}' ) {
      this.serviApp.alecrtMsg('Seleccione el motivo');
      return  false;
    }
    if ( JSON.stringify(this.solicitudes[0].fecha)=='' ) {
      this.serviApp.alecrtMsg('Seleccione la fecha');
      return  false;
    }
    return true;
  }

	sowlicitar(){
		/*var msg = 'El servicio tiene un costo por ' + this.solicitudes[0].servicio.precio + ' Desea solicitarlo?'
		let alert = this.alertCtrl.create({
			title:    'Mensaje',
			subTitle: msg ,
			buttons:  [{
				text: "SI",
				handler: data => {
					console.log('Accion SI' + data)
				} 
			} , {
				text: "NO",
				handler: data => {
					console.log('Accion NO')
				} 
			}]
		});
		alert.present();
		this.dismiss()*/
	}

	public Log(stuff): void {
		console.log(stuff);
	}
	public event(data: Date): void {}

	setDate(date: Date) {
		console.log(date);
		this.fecha = date;
		this.solicitudes[0].fecha = this.fecha;
	}

	dismiss() {
	 this.viewCtrl.dismiss();
	}

	verNotificaciones(){
		 this.navCtrl.push(NotificacionesPage);
	}
}
