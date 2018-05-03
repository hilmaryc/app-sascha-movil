import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class MotivosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'motivo','s')
  }

  getAll(){
    return super.getAll();
  }

}