import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class GeneralService {

  private urlBaseApi = "http://localhost:5000";
  //private urlBaseApi = "http://api-sascha.herokuapp.com";

  constructor(protected http: HttpClient, protected urlModulo: String) { }

  public getAll(): Observable<any> {
  	return this.http.get(this.getUrl());
  }

  public create (data): Observable<any> {
    return this.http.post(this.getUrl(),data);
  }

  public delete(id): Observable<any> {
		return this.http.delete(this.getUrlById(id));  	
  }

	public update(id,data): Observable<any> {
		return  this.http.put(this.getUrlById(id),data); 	
	}

  public getUrl(){
    return `${this.urlBaseApi}/${this.urlModulo}`;     
  }

  public getUrlById(id: any){
    return `${this.urlBaseApi}/${this.urlModulo}/${id}`;     
  }

}
