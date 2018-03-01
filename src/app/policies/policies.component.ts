import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './policies.service';  
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Policies } from './policies';  
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    selector: 'policies.component',  
    templateUrl: 'policies.component.html',
    providers: [PoliciesService]  
})

export class PoliciesComponent implements OnInit { 
    policies: Observable<Policies[]>;
    selectedPolicy : Policies = new Policies();
    myPolicy : Observable<Policies[]>;
    policy: Policies;
    errorMessage: String;
    dataAvailableById= true;
   //  policies: Observable<any[]>;
    currentUser: User;
        users: User[] = [];  
    cust_code :String;
     dconNo : String;
    constructor(
       private router: Router,
        private _policiesService: PoliciesService,
        private userService: UserService) 
        {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.cust_code=localStorage.getItem('cust_code')
         }
      
       
         ngOnInit() {  
            this.loadAllUsers();  
            this.getPolicies()
            }
            getPolicies() {  
             //   debugger  
                console.log('this.currentUser',this.currentUser);
                this.policies = this._policiesService.getPolicies(this.currentUser.cust_code);  
              
                } 
                private loadAllUsers() {
                    this.userService.getAll().subscribe(users => { this.users = users; });
                } 
       
                 onSelect(dcon_no:any){
                     console.log('Dcon_no', dcon_no);
                     this.myPolicy = this._policiesService.getMore(this.currentUser.cust_code, dcon_no)
                      this.dconNo = dcon_no;
                     // console.log('myPolicy', this.myPolicy);
                    }
             
                    display: boolean = false;

                    showDialog() {
                        this.display = true;
                    }
  }  
