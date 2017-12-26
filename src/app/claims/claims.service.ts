import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Claims } from './claims';  
import { Observable, Subject } from 'rxjs/Rx';  
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
@Injectable()  
export class ClaimsService {  
apiUrl: string = "http://192.168.100.26:3000/api/dep";// Web API URL  
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
getClaims(): Observable<Claims[]> {  
return this._http.get(this.apiUrl)  
.map((res: Response) => res.json())  
.catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
}  
}  