import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';  
import { Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Query } from './query';

@Injectable()
export class QueryService {
apiUrl: string = "http://localhost:4000/api/query";// Web API URL
constructor(private _http: Http) { }  
private RegenerateData = new Subject<number>();  
RegenerateData$ = this.RegenerateData.asObservable();  
AnnounceChange(mission: number) {  
this.RegenerateData.next(mission);  
}  


    create(query: Query) {
        return this._http.post(this.apiUrl, query);
    }

 
}