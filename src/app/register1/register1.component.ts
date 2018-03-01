import { Component } from '@angular/core';
import { Register1Service } from './register1.service';
import { AlertService } from '../_services/index';
import { Router } from '@angular/router';
import { Register1 } from './register1';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
@Component({
    moduleId: module.id.toString(),
    selector: 'register1.component',
    templateUrl: 'register1.component.html',

    //providers: [Register1Service]  
})

export class Register1Component {
    model: any = {};
    loading = false;
    registrationSubscription: Subscription;
    //query: Observable<any[]>; 

    constructor(
        private router: Router,
        private _register1Service: Register1Service,
        private alertService: AlertService) { }

    //  ngOnInit() {  
    //     this.register();  
    //     }
    register() {
        this.loading = true;
        this.registrationSubscription = this._register1Service.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
    ngonDestroy() {
        if (this.registrationSubscription) {
            this.registrationSubscription.unsubscribe();
        }

    }

}
