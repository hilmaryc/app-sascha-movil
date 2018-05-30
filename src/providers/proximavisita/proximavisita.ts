import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class ProximavisitaProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'proximavisita/cliente','')
  }

  get(id){
    return super.get(id);
  }

}