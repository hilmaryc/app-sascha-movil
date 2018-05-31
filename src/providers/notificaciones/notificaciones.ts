import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service';
@Injectable()
export class NotificacionesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'notificaciones/usuario','')
  }

  get(id){
    return super.get(id);
  }

}