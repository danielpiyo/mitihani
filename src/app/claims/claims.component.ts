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