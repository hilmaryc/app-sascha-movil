import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class SolicitudesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'solicitud','es')
  }

  create(body){
    return super.create(body);
  }

}
