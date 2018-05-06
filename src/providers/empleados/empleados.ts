import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service';

@Injectable()
export class EmpleadosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'empleado','s')
  }

  getAll(){
    return super.getAll();
  }

}
