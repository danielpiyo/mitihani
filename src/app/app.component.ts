import { Component } from '@angular/core';
import { ClaimsComponent } from './claims/claims.component'
import './rxjs-operators';

import '../assets/app.css';
import { Directive } from '@angular/core/src/metadata/directives';
import { COMMON_DIRECTIVES } from '@angular/common/src/directives';
import { NgModule } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
    
    
    
     
   
})
@NgModule({
    declarations: <any>[ ClaimsComponent]
    
})
export class AppComponent {
    
 }




