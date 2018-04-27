import { Component } from '@angular/core';
import { AlertController, NavController, Loading, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NotificacionesPage } from '../../pages/notificaciones/notificaciones';

@Component({
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public TAG: string = 'PerfilPage';
  public loading: Loading;
  public perfil:any[] = [{
                "nombre" : "",
                "apellidos" : "",
                "cedula" : "",
                "fechaNacimiento" : "",
                "estadoCivil" : "",
                "genero" : "",
                "telefono" : "",
                "estado" : "",
                "direccion": ""
              }];

  constructor(
    public alertCtrl: AlertController, 
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private storage: Storage) { 

    this.getCliente();
  }
/*
{
    "id_usuario":17,
  "id_cliente":10,
  "cedula":"V-24160052",
  "nombres":"José Alberto",
  "apellidos":"Guerrero Carrillo",
  "telefono":"0414-5495292",
  "genero":"Masculino",
  "estado_civil":
  "Soltero/a",
  "direccion":"Urb. El Amanecer, Cabudare",
  "fecha_nacimiento":"1994-06-07T00:00:00.000Z",
  "tipo_cliente":1,
  "estado":"Lara",
  "rango_edad":"Joven "}*/
async getCliente(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    await this.storage.ready().then(() => {
      this.storage
          .get('usuario')
          .then( (usuario) => {
              let cliente = usuario.data.cliente;
              console.log(this.TAG,' getCliente ' + JSON.stringify(cliente));
              this.perfil = [{
                "nombre" : cliente.nombres,
                "apellidos" : cliente.apellidos,
                "cedula" : cliente.cedula,
                "fechaNacimiento" : cliente.fecha_nacimiento,
                "estadoCivil" : cliente.estado_civil,
                "genero" : cliente.genero,
                "telefono" : cliente.telefono,
                "estado" : cliente.estado,
                "direccion": cliente.direccion
              }];
              this.loading.dismiss();
          })
          .catch((err) =>{
            console.log(err);
          });
    });
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
            else if ( parametro == 'fechaNacimiento' )
               this.perfil[0].fechaNacimiento = data.fechaNacimiento;
             else if ( parametro == 'estadoCivil' )
               this.perfil[0].estadoCivil = data.estadoCivil;
             else if ( parametro == 'genero' )
               this.perfil[0].genero = data.genero;
             else if ( parametro == 'telefono' )
               this.perfil[0].telefono = data.telefono;
             else if ( parametro == 'estado' )
               this.perfil[0].estado = data.estado;
             else ( parametro == 'direccion' )
               this.perfil[0].direccion = data.direccion

            console.log(JSON.stringify(this.perfil));
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
  let alert = this.alertCtrl.create({
    title:    'Mensaje',
    subTitle: 'Su perfil ha sido actualizado exitosamente!',
    buttons:  ['OK']
  });
  alert.present();
}
}