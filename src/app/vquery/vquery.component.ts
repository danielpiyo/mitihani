import { Component, OnInit } from '@angular/core';
import { VqueryService } from './vquery.service';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Vquery } from './vquery';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id.toString(),
    selector: 'vquery.component',
    templateUrl: 'vquery.component.html',
    providers: [VqueryService]
})

export class VqueryComponent implements OnInit {
    vquery: Observable<Vquery[]>;
    selectedQuery : Vquery = new Vquery();
    vqu: Vquery;
    errorMessage: String;
    dataAvailableById = true;
    vquerySubscription: Subscription;
    myVquery : Observable<Vquery[]>;
    currentUser: User;
    users: User[] = [];
    cust_code: String;
    inqId : String;

    constructor(
        private router: Router,
        private _vqueryService: VqueryService,
        private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.cust_code = localStorage.getItem('cust_code')
    }


    ngOnInit() {
        this.loadAllUsers();
        this.getVquery()
    }
    getVquery() {
        //  debugger  
        // console.log('this.currentUser',this.currentUser);
        this.vquery = this._vqueryService.getVquery(this.currentUser.cust_code);
    }
    private loadAllUsers() {
        this.vquerySubscription = this.userService.getAll().subscribe(users => { this.users = users; });
    }

    ngonDestroy() {
        if (this.vquerySubscription) {
            this.vquerySubscription.unsubscribe();
        }
    }

    onSelect(inq_id:any){
        console.log('INQ_ID', inq_id);
        this.myVquery = this._vqueryService.getMore(this.currentUser.cust_code, inq_id);
        this.inqId = inq_id;
        //console.log('mqVquery', this.vquery);
    }

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

}  


