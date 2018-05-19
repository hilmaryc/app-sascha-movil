import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class BloquehorariosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    //super(http,'bloquehorario','s')
    super(http,'horarioporempleadoydia','')
  }

  getAll(){
    return super.getAll();
  }

  getBody(body){
  	return super.getBody(body);
  }

}