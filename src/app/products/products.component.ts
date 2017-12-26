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
import { IalertService } from './ialert.service';
import { Router } from '@angular/router';
import { Job } from './products';  
import { Observable } from 'rxjs/Rx';
@Component({  
moduleId: module.id.toString(),  
selector: 'products.component',  
templateUrl: 'products.component.html',  
providers: [ProductsService]  
})  

export class ProductsComponent {
    model: any = {};
    loading = false;
    query: Observable<any[]>; 

    constructor(
       private router: Router,
        private _productsService: ProductsService,
      private ialertService: IalertService) 
        { }
      
        ngOnInit() {  
            this.register();  
            }
    register() {
        this.loading = true;
        this._productsService.create(this.model)
            .subscribe(
                data => {
        this.ialertService.success('Saving successful', true);
                    this.router.navigate(['/claims']);
                },
                error => {
                  this.ialertService.error(error);
                    this.loading = false;
                });
    }

}  