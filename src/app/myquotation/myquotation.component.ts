import { Component, OnInit } from '@angular/core';
import { MyquotationService } from './myquotation.service';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Myquotation } from './myquotation';
import { Quote } from '../quotsummary/quote';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../_services/index';
//import { MatDialog } from '@angular/material';
import { MorequotationService } from '../morequotation/morequotation.service';
import { Overlay } from 'ngx-modialog';
import {ModalModule} from 'ng2-modal';



@Component({
    moduleId: module.id.toString(),
    selector: 'myquotation.component',
    templateUrl: 'myquotation.component.html',
    providers: [MyquotationService]
})

export class MyquotationComponent implements OnInit {
    myquotations: Observable<Myquotation[]>;
    selectedQuotation: Quote = new Quote();
    // policy: Policies;
    //  policies: Observable<any[]>;
    currentUser: User;
    currentQuote: Quote;
    users: User[] = [];
    control_no: String;
    cust_code : String;
    mquote : Observable<Quote[]>;
    myquotationSubscription : Subscription;
    dconNo : String;
    loading = false;

    constructor(      
        private router: Router,
        private alertService : AlertService,
        private _myquotationService: MyquotationService,
        private _morequotationService : MorequotationService,
        private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentQuote = JSON.parse(localStorage.getItem('currentQuote'));
        this.control_no = localStorage.getItem('control_no');
        this.cust_code = localStorage.getItem('cust_code')
    }


    ngOnInit() {
        this.loadAllUsers();
        this.getMyquotations() 
    }
    getMyquotations() {
        //debugger
        //console.log('this.currentQuote', this.currentQuote);
        this.myquotations = this._myquotationService.getMyquotations(this.currentUser.cust_code);
    }
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    onSelect(dcon_no:any){
        console.log('dcon_no', dcon_no);        
        this.mquote = this._myquotationService.getMore(this.currentUser.cust_code,dcon_no)  
         this.dconNo = dcon_no;
  
     } 
    
         
     display: boolean = false;

    showDialog() {
        this.display = true;
    }
}

 
