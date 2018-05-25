import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class TiporeclamosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'tipomotivos/reclamo','')
  }

  getAll(){
    return super.getAll();
  }

}