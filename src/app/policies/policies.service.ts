import { Injectable } from '@angular/core';  
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http'; 
import { HttpParams, HttpClient } from '@angular/common/http';
import { Policies } from './policies';  
import { Observable, Subject } from 'rxjs/Rx';  
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
@Injectable()  
export class PoliciesService {  
apiUrl: string = "http://localhost:4000/api/client/";// Web API URL  
constructor(private _http: Http) { }  


getPolicies(cust_Code:String): Observable<Policies[]> {
	console.log('cust_code',cust_Code);
	return this._http.get(this.apiUrl+cust_Code)
	.map((res: Response) => res.json())  
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
} 

getPolicyById(client_number: string): Observable<Policies[]> {
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');    
	let myParams = new URLSearchParams();
	myParams.append('client_number', client_number);			
        let options = new RequestOptions({ headers: myHeaders, params: myParams });
	    return this._http.get(this.apiUrl, options)
		.map((res: Response) => res.json())  
		.catch((error: any) => Observable.throw(error.json().error || 'Server error'));  

} 

}
