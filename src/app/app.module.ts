import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { ProductsService } from './products/products.service';
import { IalertService } from './products/ialert.service';
import { Register1Service } from './register1/register1.service';
import { ClaimsService } from  './claims/claims.service';
import { PoliciesService } from './policies/policies.service'
import { AlertComponent } from './_directives/index';
import { ModalComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, ModalService } from './_services/index';
import { DataService } from './data/data.service';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { Register1Component } from './register1/index';
import { ClaimsComponent } from './claims/index';
import { ProductsComponent } from './products/index';
import { QuatationsComponent } from './quatations/index';
import { PoliciesComponent } from './policies/index';
import { QueryComponent } from './query/index';
import { RenewComponent } from './renew/index';
import { ProfileComponent } from './profile/index';
import { PregComponent } from './preg/index';
import { RquComponent } from './rqu/index';
import { DataComponent } from './data/index';
import { FlexLayoutModule } from "@angular/flex-layout";

import { from } from 'rxjs/observable/from';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        FlexLayoutModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ClaimsComponent,
        ProductsComponent,
        QuatationsComponent,
        PoliciesComponent,
       QueryComponent,
       RenewComponent,
       ProfileComponent,
       PregComponent,
       ModalComponent,
       RquComponent,
       Register1Component,
       DataComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ClaimsService,
        PoliciesService,
        ProductsService,
        IalertService,
        ModalService,
        Register1Service,
        DataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }