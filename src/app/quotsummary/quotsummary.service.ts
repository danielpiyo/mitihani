import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Quote } from './quote';

@Injectable()
export class QuotsummaryService {
apiUrl: string = "http://173.255.200.221:3001/quote/:dcon";// Web API URL

private static quoteSummary:any;


constructor(private _http: Http) { }  

getQuotes(): Observable<Quote[]> {  
    return this._http.get(this.apiUrl)  
    .map((res: Response) => res.json())  
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
    }  

    setQuote(quote:any){

        QuotsummaryService.quoteSummary=quote;
        console.log('this.quoteSummary',QuotsummaryService.quoteSummary);
        localStorage.setItem('QuotsummaryService.quoteSummary',JSON.stringify(quote));
        
     //JSON.parse();
    }

    getQuote():any{
     console.log('this.quoteSummary2',localStorage.getItem('QuotsummaryService.quoteSummary'));
     return   JSON.parse(localStorage.getItem('QuotsummaryService.quoteSummary'));
    }



    } 

    

