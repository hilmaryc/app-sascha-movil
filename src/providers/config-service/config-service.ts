import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './config'

/*
  Generated class for the ConfigServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigService {

	configUrl = '../../assets/data/config.json';
	urlBase: String;

  	constructor(public http: HttpClient) { }

  	getConfig(){
  		return this.http.get<Config>(this.configUrl);
	}

}
