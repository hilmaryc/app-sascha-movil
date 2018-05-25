import { Component } from '@angular/core';
import { IonicPage, Alert, AlertController, NavController, Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PerfilProvider } from '../../providers/perfil/perfil';
import { EstadocivilesProvider } from '../../providers/estadociviles/estadociviles';
import { GenerosProvider } from '../../providers/generos/generos';

@IonicPage()
@Component({
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public TAG: string = 'PerfilPage';
  public loading: Loading;
  public myImputs: any=[];
  public usuario: any;
  public perfil:any[] = [{
                "nombres" : "",
                "apellidos" : "",
                "cedula" : "",
                "fecha_nacimiento" : "",
                "genero" : {
                  "id_genero": 0,
                  "nombre":""
                },
                "telefono" : "",
                "direccion": "",
                "estado_civil":{
                  "id_estado_civil": 0,
                  "nombre":""
                }
              }];

  public fecha_nacimiento: Date = new Date();
  public minDate: Date = new Date(1918, 1, 1);
  
  public min: Date = new Date()
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public perfilProv: PerfilProvider,
    public estadocivilesProv: EstadocivilesProvider,
    public generosProv: GenerosProvider) { 
    this.getCliente();
  }

async getCliente(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
              this.usuario = usuario;
              let cliente = usuario.data.cliente;
              this.fecha_nacimiento = new Date(cliente.fecha_nacimiento);
              this.perfil = [{
                "nombres" : cliente.nombres,
                "apellidos" : cliente.apellidos,
                "cedula" : cliente.cedula,
                "fecha_nacimiento" : cliente.fecha_nacimiento,
                "estado_civil" : {
                  "id_estado_civil": cliente.id_estado_civil,
                  "nombre": cliente.estado_civil,
                },
                "genero" : {
                  "id_genero": cliente.id_genero,
                  "nombre": cliente.genero
                },
                "telefono" : cliente.telefono,
                "direccion": cliente.direccion
              }];
              this.loading.dismiss();
          })
          .catch((err) =>{
            console.log(JSON.stringify(err));
          });
    });
  }

  setDate(date: Date) {
    console.log(date);
    this.fecha_nacimiento = date;
    this.perfil[0].fecha_nacimiento = date;
    this.summit();
  }

async getEstadoCiviles(parametro,title,valor): Promise<void> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    await this.estadocivilesProv.getAll()
      .subscribe(
      (res)=>{
        let estadociviles: any[] = res['data'];
        this.myImputs=[];
        for ( let i in estadociviles ){
          let checkeded: boolean = false;
          if ( estadociviles[i].nombre == valor ) checkeded = true;
          let data:any = { 
            type: 'radio',
            label: estadociviles[i].nombre,
            value: estadociviles[i],
            checked: checkeded 
          };
          this.myImputs.push(data);
        }
        console.log('myImputs',JSON.stringify(this.myImputs));
        this.alertSelection(parametro,title,valor);
        this.loading.dismiss();
      },
      (error)=>{
        this.errorConeccion(error);
      }
    );  
  }

async getGeneros(parametro,title,valor): Promise<void> {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    await this.generosProv.getAll()
      .subscribe(
      (res)=>{
        let generos: any[] = res['data'];
        this.myImputs=[];
        for ( let i in generos ){
          let checkeded: boolean = false;
          if ( generos[i].nombre == valor ) checkeded = true;
          let data:any = { 
            type: 'radio',
            label: generos[i].nombre,
            value: generos[i],
            checked: checkeded 
          };
          this.myImputs.push(data);
        }
        console.log('myImputs',JSON.stringify(this.myImputs));
        this.alertSelection(parametro,title,valor);
        this.loading.dismiss();
      },
      (error)=>{
        this.errorConeccion(error);
      }
    );  
  }

  errorConeccion(error){
    this.loading.dismiss();
    console.log( JSON.stringify(error) );
    const alert: Alert = this.alertCtrl.create({
      message: 'Problema con la coneccion a internet',
      buttons: [{ text: 'Ok', role: 'cancelar' }]
    });
    alert.present();
  }

  editar(parametro,title ,valor) {
    let editar = this.alertCtrl.create({
      title: title,
      inputs: [
        { 
          name: parametro,
          value: valor
        },
             ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(parametro+ 'Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            if ( parametro == 'nombres' )
              this.perfil[0].nombres = data.nombres;
            else if ( parametro == 'apellidos' )
              this.perfil[0].apellidos = data.apellidos;
            else if ( parametro == 'cedula' )
              this.perfil[0].cedula = data.cedula;
            else if ( parametro == 'telefono' )
              this.perfil[0].telefono = data.telefono;
            else if ( parametro == 'direccion' )
              this.perfil[0].direccion = data.direccion;
            else console.log('parametro no exitosamente');
            this.summit();
          }
        }
      ]
    });
    editar.present();
  }

seleccion(parametro,title,valor) {
  if ( parametro == 'estado_civil' )
    this.getEstadoCiviles(parametro,title,valor);
  else if ( parametro == 'genero' )
    this.getGeneros(parametro,title,valor);
}

alertSelection(parametro,title,valor){
   let editar = this.alertCtrl.create({
      title: title,
      inputs: this.myImputs,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(parametro+ 'Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            if ( parametro == 'estado_civil' )
              this.perfil[0].estado_civil = data;
            else if ( parametro == 'genero' )
              this.perfil[0].genero = data;
            else console.log('parametro no exitosamente');;
           this.summit();
          }
        }
      ]
    });
    editar.present();
}

verNotificaciones(){
  this.navCtrl.push('NotificacionesPage');
}

async summit(): Promise<void> {

  await this.perfilProv.update(this.usuario.data.cliente.id_cliente,this.perfil[0])
  .subscribe(
    (res)=>{
      this.usuario.data.cliente.nombres           = this.perfil[0].nombres;
      this.usuario.data.cliente.apellidos         = this.perfil[0].apellidos;
      this.usuario.data.cliente.cedula            = this.perfil[0].cedula;
      this.usuario.data.cliente.fecha_nacimiento  = this.perfil[0].fecha_nacimiento;
      this.usuario.data.cliente.id_genero         = this.perfil[0].genero.id_genero;
      this.usuario.data.cliente.genero            = this.perfil[0].genero.nombre;
      this.usuario.data.cliente.id_estado_civil   = this.perfil[0].estado_civil.id_estado_civil;
      this.usuario.data.cliente.estado_civil      = this.perfil[0].estado_civil.nombre;
      this.usuario.data.cliente.telefono          = this.perfil[0].telefono;
      this.usuario.data.cliente.direccion         = this.perfil[0].direccion;
      this.storage.set('usuario', this.usuario);
      let alert = this.alertCtrl.create({
        title:    'Mensaje',
        subTitle: 'Su perfil ha sido actualizado exitosamente!',
        buttons:  ['OK']
      });
      alert.present();
    },
    (error)=>{
      this.errorConeccion(error);
    }
  ); 
}

}