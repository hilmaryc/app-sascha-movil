import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class CalificacionesProvider  extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'calificaciones/visita','')
  }

  createId(body,id){
    return super.createId(body,id);
  }

}
