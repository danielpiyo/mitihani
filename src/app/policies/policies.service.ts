import { Injectable } from '@angular/core';  
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import { Policies } from './policies';  
import { Observable, Subject } from 'rxjs/Rx';  
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
@Injectable()  
export class PoliciesService {  
apiUrl: string = "http://localhost:3000/api/employees";// Web API URL  
constructor(private _http: Http) { }  
private RegenerateData = new Subject<number>();  
RegenerateData$ = this.RegenerateData.asObservable();  
AnnounceChange(mission: number) {  
this.RegenerateData.next(mission);  
}  
// //  
// getCricketers() {  
// return this._http.get(this.apiUrl)  
// .map((response) => response.json());  
//}  
getPolicies(): Observable<Policies[]> {  
return this._http.get(this.apiUrl)  
.map((res: Response) => res.json())  
.catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
}  
}  