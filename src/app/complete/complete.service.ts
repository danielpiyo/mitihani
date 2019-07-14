import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';



@Injectable()
export class CompleteService {
    apiUrl: string = "https://www.api.cloudplace.org:4000/api/admincomplete/";// Web API URL
    
    

    constructor(private _http: Http) {

    }

    getComplete(entity_sys_id: any){
            return this._http.get(this.apiUrl + entity_sys_id)
            .map((res) =>res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));  
    }
   
   



}

