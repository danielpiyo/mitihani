import { Component } from '@angular/core';  
import { ClaimsService } from './claims.service';  
import { Claims } from './claims';  
import { Observable } from 'rxjs/Rx';
import { User } from '../_models/index';
import { UserService } from '../_services/index'; 
@Component({  
moduleId: module.id.toString(),  
selector: 'claims.component',  
templateUrl: 'claims.component.html',  
providers: [ClaimsService]  
})  
export class ClaimsComponent {  
claims: Observable<any[]>;
currentUser: User;
    users: User[] = []; 
constructor(private _claimsService: ClaimsService,private userService: UserService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
}  
ngOnInit() {  
this.getClaims(); 
this.loadAllUsers();
}  
//  
getClaims() {  
debugger  
this.claims = this._claimsService.getClaims();  
} 
private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
} 
}  