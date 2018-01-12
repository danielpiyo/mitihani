import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/Rx'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Products } from './products';

@Injectable()
export class ProductsService {
apiUrl: string = "http://192.168.100.26:4000/api/pro";// Web API URL
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

    //getAll() {
    //    return this._http.get<Job[]>(this.apiUrl);
    //}

   // getById(id: number) {
   //     return this._http.get('/api/users/' + id);
   // }

  //  create(job: Job) {
    //    return this._http.post(this.apiUrl, job);
    //}

 //   update(user: User) {
   //     return this._http.put('/api/users/' + user.id, user);
  //  }

  //  delete(id: number) {
    //    return this._http.delete('/api/users/' + id);
   // }
