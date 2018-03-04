import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { fakeBackendProvider } from './_helpers/index';
import { QuatationsService } from './quatations/quatations.service';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ProductsService } from './products/products.service';
import { IalertService } from './products/ialert.service';
import { Register1Service } from './register1/register1.service';
import { VqueryService } from './vquery/vquery.service';
import { PoliciesService } from './policies/policies.service'
import { AlertComponent } from './_directives/index';
import { ClaimsComponent } from './claims/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, UserService } from './_services/index';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { Register1Component } from './register1/index';
import { VqueryComponent } from './vquery/index';
import { ProductsComponent } from './products/index';
import { QuatationsComponent } from './quatations/index';
import { PoliciesComponent } from './policies/index';
import { QueryComponent } from './query/index';
import { MyquotationComponent } from './myquotation/index';
import { MyquotationService } from './myquotation/myquotation.service';
import { ProfileComponent } from './profile/index';
import { RquComponent } from './rqu/index';
import { QuotsummaryComponent } from './quotsummary/index';
import { QuotsummaryService } from './quotsummary/quotsummary.service';

import { FlexLayoutModule } from "@angular/flex-layout";
import { from } from 'rxjs/observable/from';

import { DialogModule } from 'primeng/dialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { MorequotationComponent } from './morequotation/index';
import { MorequotationService } from './morequotation/morequotation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    imports: [
        BrowserModule,

        BootstrapModalModule,
        BrowserAnimationsModule,
        FileUploadModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        FlexLayoutModule,

        DialogModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        VqueryComponent,
        ProductsComponent,
        QuatationsComponent,
        PoliciesComponent,
        QueryComponent,
        ProfileComponent,
        ClaimsComponent,
        RquComponent,
        Register1Component,
        MyquotationComponent,
        QuotsummaryComponent,
        MorequotationComponent


    ],
    providers: [
        AuthGuard,
        AlertService,
        QuatationsService,
        UserService,
        VqueryService,
        PoliciesService,
        ProductsService,
        IalertService,

        Register1Service,
        QuotsummaryService,
        MyquotationService,
        LoginService,
        MorequotationService,

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