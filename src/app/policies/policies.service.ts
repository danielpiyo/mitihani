import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
import { Policies } from './policies';  
import { Observable } from 'rxjs/Observable';  
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/catch';

@Injectable()  
export class PoliciesService {  
apiUrl: string = "http://173.255.200.221:4000/api/client/";// Web API URL  
apiUrl1: string = "http://173.255.200.221:4000/api/morepol/";
constructor(private _http: Http) { }  

 
getPolicies(cust_Code:String): Observable<Policies[]> {
	//console.log('cust_code',cust_Code);
	return this._http.get(this.apiUrl+cust_Code)
	.map((res: Response) => res.json())  
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
} 

getMore(cust_code: any, dcon_no: any): Observable<Policies[]>{
	return this._http.get(this.apiUrl1 + cust_code + "/" + dcon_no)
	.map((response : Response) => response.json())
	.catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
}

}
