import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './policies.service';  
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import { Policies } from './policies';  
@Component({
    moduleId: module.id.toString(),
    selector: 'policies.component',  
    templateUrl: 'policies.component.html',
    providers: [PoliciesService]  
})

export class PoliciesComponent {  
    policies: Observable<any[]>;  
    constructor(private _policiesService: PoliciesService) {  
    }  
    ngOnInit() {  
    this.getPolicies();  
    }  
    //  
    getPolicies() {  
    debugger  
    this.policies = this._policiesService.getPolicies();  
    }  
    }  
/*

export class PoliciesComponent 
implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
*/