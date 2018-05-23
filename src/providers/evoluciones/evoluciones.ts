import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class EvolucionesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'agendas/cliente','')
  }

  get(id){
    return super.get(id);
  }

}