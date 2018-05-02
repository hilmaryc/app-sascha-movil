import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class PromocionesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'promociones')
  }

  getAll(){
    return super.getAll();
  }

}
