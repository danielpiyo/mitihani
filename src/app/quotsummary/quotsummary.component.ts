
import { Component } from '@angular/core';
import { QuotsummaryService } from './quotsummary.service'; 
import { UserService } from '../_services/index'; 
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Quote } from './quote';  
import { Observable } from 'rxjs/Observable';
import {SummModel} from './summModel';
//import { UploadModel } from './uploadModel';
//import {PageEvent} from '@angular/material';
//import {MatTableDataSource} from '@angular/material';


@Component({  
moduleId: module.id.toString(),  
selector: 'quotsummary.component',  
templateUrl: 'quotsummary.component.html',  
providers: [QuotsummaryService]  
})  

export class QuotsummaryComponent {  
    benefits: any;
    risk: any;
  //quickUpload : UploadModel = new UploadModel(); //upload object
  quickSumm:Quote=new Quote();
    quote: Observable<any[]>;
    currentUser: User;
        users: User[] = [];  
        model:any;
     

    constructor(
       private router: Router,
        private _quotsummaryService: QuotsummaryService,
        private userService: UserService) 
        { 
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        }
      
        ngOnInit() {  
           // this.loadAllUsers();  
            //this.getQuotes();
            this.model=this._quotsummaryService.getQuote();
            this.quickSumm=this.model.quote[0];
            this.risk=this.model.risk[0];
            this.benefits=this.model.benefits;
            console.log('model',this.model);

            }

            getQuotes() {  
                debugger  
                this.quote = this._quotsummaryService.getQuotes();  
                } 
               


  }  

