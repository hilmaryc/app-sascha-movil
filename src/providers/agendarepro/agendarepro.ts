import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class AgendareproProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'agendas/proximacita','')
  }

  getBody(body){
    return super.getBody(body);
  }

}
