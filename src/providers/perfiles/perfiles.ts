import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class PerfilesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'parametros/cliente','')
  }

  get(id){
    return super.get(id);
  }

}