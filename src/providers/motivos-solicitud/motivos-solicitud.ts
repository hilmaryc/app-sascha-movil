import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class MotivosSolicitudProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'motivos/solicitud','')
  }

  getAll(){
    return super.getAll();
  }

}
