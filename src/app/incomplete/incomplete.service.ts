import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';
import { SetModel } from './setModel';



@Injectable()
export class IncompleteService {
    apiUrl: string = "https://www.api.cloudplace.org:4000/api/adminIncomplete/";// Web API URL
    apiUrl1: string = "https://www.api.cloudplace.org:4000/api/QuestionSet/";// Web API URL
    

    constructor(private _http: Http) {

    }

    getIncomplete(entity_sys_id: any){
            return this._http.get(this.apiUrl + entity_sys_id)
            .map((res) =>res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));  
    }
   
    setQuiz(quickSet: SetModel){
        return this._http.post(this.apiUrl1, quickSet)
       // .map((res)=>res.json())
       // .catch((error: any)=> Observable.throw(error.json() || 'Server Error'));

    }
   



}

