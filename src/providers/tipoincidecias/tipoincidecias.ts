import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class TipoincideciasProvider  extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'tipomotivos/incidencia','')
  }

  getAll(){
    return super.getAll();
  }

}