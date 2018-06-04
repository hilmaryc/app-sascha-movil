import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class ValoracionesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'criterios/visita', '')
  }

  getAll(){
    return super.getAll();
  }

  get(id){
    return super.get(id);
  }
}