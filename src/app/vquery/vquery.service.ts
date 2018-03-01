import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
import { Vquery } from './vquery';  
import { Observable } from 'rxjs/Observable';  
import { Subject } from 'rxjs/Subject';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
@Injectable()  
export class VqueryService {  
apiUrl: string = "http://173.255.200.221:4000/api/vq/";// Web API URL  
apiUrl1: string = "http://173.255.200.221:4000/api/morequery/";
constructor(private _http: Http) { }  

 
getVquery(cust_Code:String): Observable<Vquery[]> {
	//console.log('cust_code',cust_Code);
	return this._http.get(this.apiUrl+cust_Code)
	.map((res: Response) => res.json())   
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
} 
 
getMore(cust_code: any, inq_id: any): Observable<Vquery[]>{
	return this._http.get(this.apiUrl1 + cust_code + "/" + inq_id)
	.map((response : Response) => response.json())
	.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}

}
