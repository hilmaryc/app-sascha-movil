import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service';
@Injectable()
export class MiordenserviciosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'orden_servicios/cliente','')
  }

  get(id){
    return super.get(id);
  }

}
