import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';
import { HeaderModel } from './subjectModel';


@Injectable()
export class ClassLevelService {
    apiUrl: string = "https://www.api.cloudplace.org:4000/api/classiquiz/";// Web API URL
    apiUrl1: string = "https://www.api.cloudplace.org:4000/api/classiquizdet/"
    apiUrl2: string = "https://www.api.cloudplace.org:4000/api/staffSub/"
    apiUrl3: string = "https://www.api.cloudplace.org:4000/api/setHeader/"; //posting to header
    apiUrl4: string = "https://www.api.cloudplace.org:4000/api/iquizbrand/"; //posting to header
    

    constructor(private _http: Http) {

    }

    private RegenerateData = new Subject<number>();

    RegenerateData$ = this.RegenerateData.asObservable();

    AnnounceChange(mission: number) {
        this.RegenerateData.next(mission);
    }

    getClassLevel() {
        return this._http.get(this.apiUrl)
            .map((response) => response.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getClassDetails(code_id: any): Observable<any[]> {
        return this._http.get(this.apiUrl1 + code_id)
            .map((response) => response.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    getSubjects(code: any) {
        return this._http.get(this.apiUrl2 + code)
            .map((response) => response.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server Error'));
    }
    header(headerModel: HeaderModel) {
        return this._http.post(this.apiUrl3, headerModel)
            .map((res) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server Error'));
    }

    getBrand(){
        return this._http.get(this.apiUrl4)
        .map((res) =>res.json())
        .catch((error: any)=> Observable.throw(error.json() || 'Server Error'));
    }

}

