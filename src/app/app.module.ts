import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ClassLevelService } from './class/classLevel.service';
import { IalertService } from './class/ialert.service';
import { Register1Service } from './register1/register1.service';

import { QuestionService } from './question/question.service'
import { AlertComponent } from './_directives/index';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, UserService } from './_services/index';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { Register1Component } from './register1/index';
import { IncompleteComponent} from './incomplete/index';
import { ClassLevelComponent } from './class/index';
import { IncompleteService}from './incomplete/incomplete.service';
import { QuestionComponent } from './question/index';

import { EditQComponent } from './editquestion/index';
import { EditQService } from './editquestion/editQ.service';
import { ProfileComponent } from './profile/index';

import { FlexLayoutModule } from "@angular/flex-layout";
import { from } from 'rxjs/observable/from';
import { DialogModule } from 'primeng/primeng';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { PagerService } from './_services/index';
import { CompleteComponent} from './complete/index';
import { CompleteService} from './complete/complete.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import {
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule,
    MatToolbarModule, MatSnackBarModule, MatCardModule, MatSlideToggleModule, MatDatepickerModule, MatNativeDateModule
} from "@angular/material";


@NgModule({
    imports: [
        BrowserModule,
        MatExpansionModule,
        MatTabsModule,
        MatListModule,
        MatSnackBarModule,
        MatDatepickerModule,
        BootstrapModalModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatToolbarModule,
        MatCardModule,
        MatSlideToggleModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        routing,
        DialogModule

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
         IncompleteComponent,
        ClassLevelComponent,
        CompleteComponent,
        QuestionComponent,

        ProfileComponent,

        Register1Component,
        EditQComponent,




    ],
    providers: [
        AuthGuard,
        AlertService,
        IncompleteService,
        UserService,
        CompleteService,
        QuestionService,
        ClassLevelService,
        IalertService,
        Register1Service,

        EditQService,
        LoginService,

        PagerService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
       // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }