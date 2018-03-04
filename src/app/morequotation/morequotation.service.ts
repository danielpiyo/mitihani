import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import {  Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import { Quote } from './quote';

@Injectable()
export class MorequotationService {


private static quoteSummary:any;


constructor(private _http: Http) { }  
    setQuote(quote:any){

        MorequotationService.quoteSummary=quote;
       console.log('this.quoteSummary',MorequotationService.quoteSummary);
        localStorage.setItem('MorequotationService.quoteSummary',JSON.stringify(quote));
        
     //JSON.parse();
    }

    getQuote():any{
     console.log('this.quoteSummary2',localStorage.getItem('MorequotationService.quoteSummary'));
     return   JSON.parse(localStorage.getItem('MorequotationService.quoteSummary'));
    }



    } 

    

