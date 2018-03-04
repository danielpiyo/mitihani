import { Component, OnInit } from '@angular/core';
//import { ProductsService } from './products.service';
import { QuatationsService } from './quatations.service';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';
import { Products } from './products';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Category } from './category';
import { Prod } from './prod';
import { Section } from './selection';
import { QuoteModel } from './quoteModel';
import { Subscription } from 'rxjs/Subscription';
import { angularMath } from 'angular-ts-math';
import { Quote } from './quote';
import {MatTabsModule} from '@angular/material/tabs';
import { QuotsummaryService } from '../quotsummary/quotsummary.service';




@Component({
    moduleId: module.id.toString(),
    templateUrl: 'quatations.component.html',
    providers: [QuatationsService]
})

export class QuatationsComponent implements OnInit {

    selectedCategory: Category = new Category(<any>0, <any>'Insync');
    selectedProd: Prod = new Prod();  //any at 0 id
    //selectedSection:Section = new Section(0, 0, 0, 'Insync');  //any at 0 id
    quickQuote: QuoteModel = new QuoteModel(); //you need a quotation object   
    categories: Observable<Category[]>;
    //policies: Observable<Policies[]>;
    prods: Observable<Prod[]>;
    sections: Observable<Section[]>;
    display: boolean = false;
    quatationsSubscription: Subscription;
    loading = false;
    quote: Observable<any[]>;
    model: any = {};
    classId: String;

    // showDialog() {
    //     this.display = true;
    // }

    //  hideDialog() {
    //     this.display = false;
    // }

    currentUser: User;
    users: User[] = [];
    //class_id : String;
    //  code : String;

    constructor(private userService: UserService,
        private router: Router,
        private quotsummaryService :QuotsummaryService,
        private alertService: AlertService,
        private _quatationsService: QuatationsService) {

        //  this.categories = this._quatationsService.getCategories();
        // this.prods = this._productsService.getProds();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       
        // console.log('currentuser', this.currentUser);
        //this.class_id =localStorage.getItem('code')
        // this.code =localStorage.getItem('code')
    }

    ngOnInit() {
        this.loadAllUsers();
        this.getCategories();
        this.quickQuote.p_client_code = this.currentUser.cust_code;
        

        var next = new Date();
        var year = next.getFullYear();
        var month = next.getMonth();
        var day = next.getDate();
        var end = new Date(year + 1, month, day)
        this.quickQuote.p_end_date = end;
    }



    saveQuote() {
       // console.log('quickQuote', this.quickQuote)
        //this.quickQuote.p_age = ((Date.now() - +(new Date (this.model.p_age)))/31570335602);
        var age;
        //age = (new Date().getFullYear() - +(new Date(this.model.p_age).getFullYear()));
        age = (new Date().getFullYear() - +this.model.p_age);
        this.quickQuote.p_age = age;
        //saving new quatation 
        this.loading = true;
        this.quatationsSubscription = this._quatationsService.create(this.quickQuote)
            .subscribe(
            response => {
                this.alertService.success('Quatation Request successful', true);
                this.quotsummaryService.setQuote(JSON.parse(response._body).data)
                this.router.navigate(['/quotsummary']);
            }, 
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

    }

    getCategories() {
       // debugger
       // console.log('this.currentUser', this.currentUser);
        this.categories = this._quatationsService.getCategories();
    }

    onSelect(class_id: any) {
       // debugger
        console.log('class_id', class_id);
        this.prods = this._quatationsService.getProds(class_id);

        this.classId = class_id;
    }
    onSelection(code: any, class_id: any) {
        //class_id = this.classId;
       // debugger
       console.log('code', code);
        this.sections = this._quatationsService.getSections(this.classId, code);

    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    Quatations() {
        this.loading = true;
        this.quatationsSubscription = this._quatationsService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Quatation Request successful', true);
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    ngonDestroy() {
        if (this.quatationsSubscription) {
            this.quatationsSubscription.unsubscribe();
        }
    }

    
    
}