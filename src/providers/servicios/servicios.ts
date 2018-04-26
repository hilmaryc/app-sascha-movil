import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ServiciosProvider {

	public url:string = 'http://localhost:5000/servicios';

  constructor(public http: HttpClient) {
    console.log('Hello ServiciosProvider Provider');
  }

  getServicios(){
  	let miheaders = new HttpHeaders();
    	miheaders.append('Access-Control-Allow-Origin', '*');
      	miheaders.append('Content-Type', 'application/json');
      	miheaders.append('Accept', 'application/json');
      	miheaders.append('Access-Control-Allow-Headers', 'Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  	const httpOptions = {
    	headers: miheaders
  	};

  	return this.http.get('http://localhost:5000/servicios'); //, httpOptions
  }


}
