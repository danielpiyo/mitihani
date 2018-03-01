import { Component } from '@angular/core';  
import { ClaimsService } from './claims.service';  
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';
import { Claims } from './claims';  
import { Observable } from 'rxjs/Observable';  
import { Subscription } from 'rxjs/Subscription';
import { Policies } from './policy';
//import { ClaimModel } from './claimModel';
import { Risks } from './risk';
import { Natures } from './nature';
import { Causes } from './cause';

@Component({  
moduleId: module.id.toString(),  
selector: 'claims.component',  
templateUrl: 'claims.component.html',  
providers: [ClaimsService]  
})  

export class ClaimsComponent {
   selectedPolicy: Policies = new Policies();
  // quickClaim: ClaimModel = new ClaimModel();
   
    currentUser: User;
   
    users: User[] = [];
    claimSubscription: Subscription;
    model: any = {};
    loading = false;
    claims: Observable<any[]>; 
    policies : Observable<Policies[]>;
    risks : Observable<Risks[]>;
    nature : Observable<Natures[]>;
    cause : Observable<Causes[]>;
    cust_code : String;
    dconN0 : Number;

    constructor(
        private router: Router,
        private _claimsService: ClaimsService,
        private alertService: AlertService) 
       { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
        this.cust_code = localStorage.getItem('cust_code');
       }
      
       ngOnInit() {  
           this.model.CLAIMANT = this.currentUser.first_name; 
           //this.model.CUST_CODE = this.currentUser.cust_code; 
           //this.quickClaim.EMAIL = this.currentUser.email;
           this.model.CLAIMANT_CONTACT = this.currentUser.mobile_no;
           this.getPolicies();
           this.getNatures();
           this.getCauses();
        
          }
    saveClaim() {
       // console.log('model',this.model)
        this.loading = true;
        this.claimSubscription = this._claimsService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Claims posted successful', true);
                    this.router.navigate(['/profile']);
                },
                error => {
                  this.alertService.error(error);
                    this.loading = false;
                });
    }
    ngonDestroy(){
        if(this.claimSubscription){
            this.claimSubscription.unsubscribe();
        }
    }

    getPolicies(){
       // console.log('this.currenUser', this.currentUser);
        this.policies = this._claimsService.getPolicies(this.currentUser.cust_code);
    }
    onSelect(dcon_no:any){
       // console.log('dcon_no', dcon_no);
        this.risks = this._claimsService.getRisks(dcon_no);

        this.dconN0 = dcon_no;
 
    }
    getNatures(){
      this.nature = this._claimsService.getNatures();
    }

    getCauses(){
        this.cause = this._claimsService.getCauses();
    }

}  

