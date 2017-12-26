import { Component } from '@angular/core';  
import { QueryService } from './query.service';  
//import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { Job } from './query';  
import { Observable } from 'rxjs/Rx';  
@Component({  
moduleId: module.id.toString(),  
selector: 'query.component',  
templateUrl: 'query.component.html',  
providers: [QueryService]  
})  

export class QueryComponent {
    model: any = {};
    loading = false;
    query: Observable<any[]>; 

    constructor(
       private router: Router,
        private _queryService: QueryService)
       // private alertService: AlertService) 
       { }
      
        ngOnInit() {  
            this.register();  
            }
    register() {
        this.loading = true;
        this._queryService.create(this.model)
            .subscribe(
                data => {
                    //this.alertService.success('Saving successful', true);
                    //this.router.navigate(['/claims']);
                },
                error => {
                  //  this.alertService.error(error);
                    this.loading = false;
                });
    }

}  
  
//  
/*
getClaims() {  
debugger  
this.claims = this._claimsService.getClaims();  
}  
}  
}


import { Component } from '@angular/core';  
import { ClaimsService } from './claims.service';  
import { Claims } from './claims';  
import { Observable } from 'rxjs/Rx';  
@Component({  
moduleId: module.id.toString(),  
selector: 'claims.component',  
templateUrl: 'claims.component.html',  
providers: [ClaimsService]  
})  
export class ClaimsComponent {  
claims: Observable<any[]>;  
constructor(private _claimsService: ClaimsService) {  
}  
ngOnInit() {  
this.getClaims();  
}  
//  
getClaims() {  
debugger  
this.claims = this._claimsService.getClaims();  
}  
}  
*/