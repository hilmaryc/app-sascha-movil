import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class EstadocivilesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'estadociviles')
  }

  getAll(){
    return super.getAll();
  }

}
