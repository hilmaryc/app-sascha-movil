import { Component } from '@angular/core';
import { Alert, AlertController, NavController, Loading, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NotificacionesPage } from '../../pages/notificaciones/notificaciones';

import { PerfilProvider } from '../../providers/perfil/perfil';
import { EstadocivilesProvider } from '../../providers/estadociviles/estadociviles';
import { GenerosProvider } from '../../providers/generos/generos';

@Component({
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public TAG: string = 'PerfilPage';
  public loading: Loading;
  public myImputs: any=[];
  public perfil:any[] = [{
                "nombre" : "",
                "apellidos" : "",
                "cedula" : "",
                "fechaNacimiento" : "",
                "genero" : {
                  "id_genero": 0,
                  "nombre":""
                },
                "telefono" : "",
                "direccion": "",
                "genero":"",
                "estado_civil":{
                  "id_estado_civil": 0,
                  "nombre":""
                }
              }];

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
              let cliente = usuario.data.cliente;
              console.log(this.TAG,' getCliente ' + JSON.stringify(usuario));
              console.log(this.TAG,' getCliente ' + JSON.stringify(cliente));

              this.perfil = [{
                "nombre" : cliente.nombres,
                "apellidos" : cliente.apellidos,
                "cedula" : cliente.cedula,
                "fechaNacimiento" : cliente.fecha_nacimiento,
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
            console.log(err);
          });
    });
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
            console.log(parametro+'Guardar clicked' + JSON.stringify(data));
            if ( parametro == 'nombre' )
              this.perfil[0].nombre = data.nombre;
            else if ( parametro == 'apellidos' )
              this.perfil[0].apellidos = data.apellidos;
            else if ( parametro == 'cedula' )
              this.perfil[0].cedula = data.cedula;
            else if ( parametro == 'telefono' )
              this.perfil[0].telefono = data.telefono;
            else ( parametro == 'direccion' )
              this.perfil[0].direccion = data.direccion;
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
            console.log(parametro+ 'Perfil Actualizado' + JSON.stringify(this.perfil) );
          }
        }
      ]
    });
    editar.present();
}

verNotificaciones(){
  this.navCtrl.push(NotificacionesPage);
}

actualizar(){
  this.summit();
}

async summit(): Promise<void> {
  await this.perfilProv.update(1,this.perfil)
  .subscribe(
    (res)=>{
      this.perfil = res['data'];
    },
    (error)=>{
      this.errorConeccion(error);
    }
  ); 
  let alert = this.alertCtrl.create({
    title:    'Mensaje',
    subTitle: 'Su perfil ha sido actualizado exitosamente!',
    buttons:  ['OK']
  });
  alert.present();
}
}