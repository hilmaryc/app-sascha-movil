import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Config } from '../config-service/config'
import { ConfigService } from '../config-service/config-service';
import { Storage } from '@ionic/storage';

@Injectable()
export class RemoteProvider {

  url = ''
  user: any = {
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlhdCI6MTUyMzEzODg4MSwiZXhwIjoxNTIzMTQ2MDgxfQ.qGxeiRMV7va0CLKsbMbULZM0wF7_fEu4Nv1aIANYKik'
  }

  constructor(public http: HttpClient, private storage: Storage, public configService: ConfigService) { 
    //this.showConfig();
    this.storage.set('user', JSON.stringify(this.user));
  }

  showConfig() {
  this.configService.getConfig()
    // clone the data object, using its known Config shape
    .subscribe(
        (data)=>{
          console.log(" ConfigService");
          console.log(data);
        },
        (error)=>{console.log(error);}
       )
  }

  getUsers(url: string){

  var miheaders = new HttpHeaders();
      miheaders.append('Access-Control-Allow-Origin', '*');
      miheaders.append('Content-Type', 'application/json');
      miheaders.append('Accept', 'application/json');
      miheaders.append('Access-Control-Allow-Headers', 'Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      miheaders.append("authorization", "token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlhdCI6MTUyMzE0NjEyMiwiZXhwIjoxNTIzMTUzMzIyfQ.AcK7IYb_UGKJ1-llkIVLbNuKB1QgvnNbi6BnzvF3KCI");
  
  this.storage.get("user").then((user) => {
    if(user){
      let info = JSON.stringify(user);
      console.log(info);
      miheaders.append('Authorization', 'token ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlhdCI6MTUyMzEzODg4MSwiZXhwIjoxNTIzMTQ2MDgxfQ.qGxeiRMV7va0CLKsbMbULZM0wF7_fEu4Nv1aIANYKik');
      }
    }
  )
  
  const httpOptions = {
    headers: miheaders
  };  

  return this.http.get(url, httpOptions); 
  
  }

}
