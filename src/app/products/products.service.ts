import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Products } from './products';

@Injectable()
export class ProductsService {
apiUrl: string = "http://173.255.200.221:4000/api/pro";// Web API URL
constructor(private _http: Http) { }  
private RegenerateData = new Subject<number>();  
RegenerateData$ = this.RegenerateData.asObservable();   
AnnounceChange(mission: number) {  
this.RegenerateData.next(mission);  
}  


getProducts(): Observable<Products[]> {  
    return this._http.get(this.apiUrl)  
    .map((res: Response) => res.json())  
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
    }  
    } 

