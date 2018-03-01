
import { Component } from '@angular/core';
import { ProductsService } from './products.service'; 
import { UserService } from '../_services/index'; 
//import { IalertService } from './ialert.service';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { Products } from './products';  
import { Observable } from 'rxjs/Observable';
//import { PaginatorModule } from 'primeng/paginator';
//import {DataTableModule} from 'primeng/datatable';
import {PageEvent} from '@angular/material';
import {MatTableDataSource} from '@angular/material';


@Component({  
moduleId: module.id.toString(),  
selector: 'products.component',  
templateUrl: 'products.component.html',  
providers: [ProductsService]  
})  

export class ProductsComponent {  
    displayedColumns = ['category', 'product_name'];
  dataSource = new MatTableDataSource<Products>();
    products: Observable<any[]>;
    currentUser: User;
        users: User[] = [];  
     //   paginate(event) {}
    constructor(
       private router: Router,
        private _productsService: ProductsService,
        private userService: UserService) 
        { 
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
      
        ngOnInit() {  
           // this.loadAllUsers();  
            this.getProducts()
            }
            getProducts() {  
                debugger  
                this.products = this._productsService.getProducts();  
                } 
                
  }  

