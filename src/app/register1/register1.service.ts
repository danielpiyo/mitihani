import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';  
import { Subject } from 'rxjs/Subject';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Register1 } from './register1';

@Injectable()
export class Register1Service {
apiUrl: string = "https://yourLinktoendpoint";// Web API URL
constructor(private _http: Http) { }  


    create(user: Register1) {
        return this._http.post(this.apiUrl, user)
        .catch((error: any) => Observable.throw(error.error.message|| 'Server error'));
    }

}

