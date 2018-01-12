/*import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'products.component.html'
})

export class ProductsComponent implements OnInit {
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
import { Component } from '@angular/core';
import { ProductsService } from './products.service'; 
import { UserService } from '../_services/index'; 
//import { IalertService } from './ialert.service';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Products } from './products';  
import { Observable } from 'rxjs/Rx';
@Component({  
moduleId: module.id.toString(),  
selector: 'products.component',  
templateUrl: 'products.component.html',  
providers: [ProductsService]  
})  

export class ProductsComponent {  
    products: Observable<any[]>;
    currentUser: User;
        users: User[] = [];  

    constructor(
       private router: Router,
        private _productsService: ProductsService,
        private userService: UserService) 
        { 
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
      
        ngOnInit() {  
            this.loadAllUsers();  
            this.getProducts()
            }
            getProducts() {  
                debugger  
                this.products = this._productsService.getProducts();  
                } 
                private loadAllUsers() {
                    this.userService.getAll().subscribe(users => { this.users = users; });
                } 
  }  

