import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service';

@Injectable()
export class AyudasProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'ayuda','s')
  }

  getAll(){
    return super.getAll();
  }

}