import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class VisitasProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'cliente/visita','s')
  }

  getBody(body){
    return super.getBody(body);
  }

}