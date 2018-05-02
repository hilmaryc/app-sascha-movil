import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './../general.service'; 

@Injectable()
export class PerfilProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'clientes')
  }

  public update(id,body): Observable<any> {
    return super.update(id,body);    
  }

}