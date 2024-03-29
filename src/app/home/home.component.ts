﻿import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html',
   
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    toggleMenu = false;


    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
      
    }    


    onToggleMenu(){
        if(this.toggleMenu === true){
            this.toggleMenu = false;
        }
        else{
            this.toggleMenu = true;
        }
    }
    

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    
 
    }
