import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class ServiciosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'servicio','s')
  }

  getAll(){
    return super.getAll();
  }

  get(id){
    return super.get(id);
  }
}
