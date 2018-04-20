import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'perfil.html'
})

export class PerfilPage {

  public perfil:any = [{
    "nombre" : "Pedro",
    "apellidos" : "Perez",
    "cedula" : "112345678",
    "fechaNacimiento" : "12/05/2002",
    "estadoCivil" : "Soltero",
    "genero" : "Masculino",
    "telefono" : "04161234567",
    "estado" : "Lara",
    "direccion": "Calle Obelisco",
  }];

  constructor(public alertCtrl: AlertController) { }
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

actualizar(){
    let alert = this.alertCtrl.create({
      title:    'Mensaje',
      subTitle: 'Su perfil ha sido actualizado exitosamente!',
      buttons:  ['OK']
    });
    alert.present();
  }
}