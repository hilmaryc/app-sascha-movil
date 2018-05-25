import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 
@Injectable()
export class OrdenProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'ordenservicio','s')
  }

  update(id,data){
    return super.update(id,data);
  }

}
