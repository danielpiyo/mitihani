import { Component } from '@angular/core';  
import { QueryService } from './query.service';  

import { User } from '../_models/index';
import { UserService } from '../_services/index';

import { AlertService } from '../_services/index';
import { Router } from '@angular/router';
import { Query } from './query';  
import { Observable } from 'rxjs/Observable';  
import { Subscription } from 'rxjs/Subscription';

@Component({  
moduleId: module.id.toString(),  
selector: 'query.component',  
templateUrl: 'query.component.html',  
providers: [QueryService]  
})  

export class QueryComponent {
    currentUser: User;
    users: User[] = [];
    querySubscription: Subscription;

    model: any = {};
    loading = false;
    query: Observable<any[]>; 

    constructor(
        private router: Router,
        private _queryService: QueryService,
        private alertService: AlertService) 
       { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       }
      
       ngOnInit() {  
           this.model.EMAIL = this.currentUser.email; 
           this.model.CUST_CODE = this.currentUser.cust_code; 
          }
    Query() {
       // console.log('model',this.model)
        this.loading = true;
        this.querySubscription = this._queryService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Inquiry posted successful', true);
                    this.router.navigate(['/vquery']);
                },
                error => {
                  this.alertService.error(error);
                    this.loading = false;
                });
    }
    ngonDestroy(){
        if(this.querySubscription){
            this.querySubscription.unsubscribe();
        }
    }

}  

