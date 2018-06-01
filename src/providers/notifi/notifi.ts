import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service';
@Injectable()
export class NotifiProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'notificacion','es')
  }

  delete(id){
  	return super.delete(id);	
  }

}