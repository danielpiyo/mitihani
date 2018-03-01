import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';  
import { Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Risks } from './risk';
import { Policies }  from './policy';
import { Claims } from './claims';
import { Causes } from './cause';
import { Natures } from './nature';
//import { ClaimModel } from './claimModel';

@Injectable()
export class ClaimsService {
apiUrl: string = "http://173.255.200.221:4000/api/client/";// Web API URL
apiUrl1 : string = "http://173.255.200.221:4000/api/risk/"
apiUrl2 : string = "http://173.255.200.221:4000/api/nature/"
apiUrl3 : string = "http://173.255.200.221:4000/api/causes/"
apiUrl4 : string = "http://173.255.200.221:4000/api/claim/"
constructor(private _http: Http) { }  
private RegenerateData = new Subject<number>();  
RegenerateData$ = this.RegenerateData.asObservable();  
AnnounceChange(mission: number) {  
this.RegenerateData.next(mission);  
}  


    create(claim: Claims) {
        return this._http.post(this.apiUrl4, claim)
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPolicies(cust_code:String): Observable<Policies[]> {
        //console.log('cust_code',cust_Code);
        return this._http.get(this.apiUrl+cust_code)
        .map((res: Response) => res.json())  
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
    } 
    getRisks(dcon_no:any): Observable<Risks[]>{
        return this._http.get(this.apiUrl1 + dcon_no)
        .map((res: Response) => res.json())
        .catch((error:any) =>Observable.throw(error.json().error || 'Server error'));
    }
 
    getNatures(): Observable<Natures[]>{
        return this._http.get(this.apiUrl2)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCauses(): Observable<Causes[]>{
        return this._http.get(this.apiUrl3)
        .map((res: Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
}