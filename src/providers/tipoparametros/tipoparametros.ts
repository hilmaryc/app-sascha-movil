import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class TipoparametrosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'tipoparametros/filtrable','s')
  }

  getAll(){
    return super.getAll();
  }

}