import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ServiciosProvider {

	//public url:string = 'http://localhost:5000';
  public url:string = 'http://api-sascha.herokuapp.com';

  constructor(public http: HttpClient) {
    console.log('Hello ServiciosProvider Provider');
  }

  getServicios(){
  	return this.http.get(this.url + '/servicios');
  }

  getPromociones(){
    return this.http.get(this.url + '/promociones');
  }
}
