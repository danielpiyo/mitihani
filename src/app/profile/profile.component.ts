import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    myTime : number;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      
        this.myTime = Date.now();
    }

    

    
}