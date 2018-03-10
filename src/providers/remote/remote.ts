import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';

@Injectable()
export class RemoteProvider {

 data1: any;
  constructor(public http: HttpClient) { }
  getUsers(){
    return  this.http.get('http://localhost:3000/api/users'); 
  }

/*
load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/users')
        .map((res : Response) => res.json())
        .subscribe(
          data => {
            this.data1 = data;
            resolve(this.data1);
          });
    });
  } 
*/
/*
  
  getUsers(){

	return this.http.get("http://localhost:3000/api/users)
        .do((res : Response ) => console.log(res.json()))
        .map((res : Response ) => res.json());
        //.catch(error => console.log(error));

  }
*/
}
