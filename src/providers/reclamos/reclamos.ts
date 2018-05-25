import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class ReclamosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'reclamo','s')
  }

  create(body){
    return super.create(body);
  }

}