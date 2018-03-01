import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
//import { Job } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import {  Subject } from 'rxjs/Subject';  
import 'rxjs/add/operator/catch';
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Products } from './products';
import { Category } from './category';
import { Section } from './selection';
import { QuoteModel } from './quoteModel';
import { Quote } from './quote';
import { Prod } from './prod';

@Injectable()
export class QuatationsService {
apiUrl: string =  "http://173.255.200.221:3001/quote/new";// Web API URL
apiUrl1: string = "http://173.255.200.221:4000/api/cat";// Web API URL
apiUrl2: string = "http://173.255.200.221:4000/api/cls/";// Web API URL
apiUrl3: string = "http://173.255.200.221:4000/api/sub/";// Web API URL
constructor(private _http: Http) { }  

getProducts(): Observable<Products[]> {  
  return this._http.get(this.apiUrl)  
  .map((res: Response) => res.json())  
  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
  } 

    getCategories() : Observable<Category[]> {  
      return this._http.get(this.apiUrl1)  
      .map((res: Response) => res.json())  
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
      } 
    
    getProds(class_id:any) : Observable<Prod[]> {  
    // console.log('class_id', class_id)
      return this._http.get(this.apiUrl2 + class_id)  
      .map((res: Response) => res.json())  
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
      } 

    getSections(class_id : any, code: any):  Observable<Section[]> { 
      //console.log('code', code)      
      return this._http.get(this.apiUrl3+ class_id + "/" + code)  
      .map((res: Response) => res.json())  
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
      } 
    create(QuoteModel: QuoteModel) {
      return this._http.post(this.apiUrl, QuoteModel)      
      .catch((error: any) => Observable.throw('Problem Submitting the Quatation. Kindly try again or contact the systemAdmin@bok.co.rw'));
  }


    } 

