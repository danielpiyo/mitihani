import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
import { Myquotation } from './myquotation';  
import { Observable } from 'rxjs/Observable';  
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/catch';
import { Quote } from '../quotsummary/quote';
import * as _ from 'underscore';


@Injectable()  
export class MyquotationService {  
apiUrl: string = "http://173.255.200.221:4000/api/myquote/";// Web API URL 
apiUrl1: string = "http://173.255.200.221:4000/api/morequote/"; 
private modals: any[] = [];
constructor(private _http: Http) { }  

 
getMyquotations(cust_code:String): Observable<Myquotation[]> {
//	console.log('cust_code',cust_code);
	return this._http.get(this.apiUrl+cust_code)
	.map((res: Response) => res.json())  
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
} 
getMore(cust_code : any, dcon_no:any): Observable<Quote[]>{
	return this._http.get(this.apiUrl1 +cust_code + "/" + dcon_no)
	.map((res: Response) => res.json())
	.catch((error:any) =>Observable.throw(error.json().error || 'Server error'));
}

}
