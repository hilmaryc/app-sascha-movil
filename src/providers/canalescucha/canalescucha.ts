import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class CanalescuchaProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'tipomotivos/canalescucha','')
  }

  getAll(){
    return super.getAll();
  }

  create(body){
  	return super.create(body);	
  }
}
