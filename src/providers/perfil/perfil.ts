import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './../general.service'; 

@Injectable()
export class PerfilProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'cliente','s')
  }

  public update(id,body): Observable<any> {

    let  data = {
      nombres : body.nombres,
      apellidos : body.apellidos,
      cedula : body.cedula,
      fecha_nacimiento : new Date(body.fecha_nacimiento),
      id_estado_civil : body.estado_civil.id_estado_civil,
      id_genero : body.genero.id_genero,
      telefono : body.telefono,
      direccion: body.direccion 
    };
    console.log('Mira',JSON.stringify(data));
    return super.update(id,data);    
  }

}