import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class EspecialidadesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'especialidad','es')
  }

  getAll(){
    return super.getAll();
  }

}
