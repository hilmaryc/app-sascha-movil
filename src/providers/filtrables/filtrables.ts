import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class FiltrablesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'servicios/filtrables','')
  }

  getAll(){
    return super.getAll();
  }

  getBody(body){
  	return super.getBody(body);
  }

}