import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { QuotsummaryComponent } from './quotsummary/index';
import { Register1Component } from './register1/index';
import { VqueryComponent } from './vquery/index';
import { ProductsComponent } from './products/index';
import { QuatationsComponent } from './quatations/index';
import { PoliciesComponent } from './policies/index';
import { QueryComponent } from './query/index';
import { ClaimsComponent } from './claims/index';

import { ProfileComponent } from './profile/index';

import { RquComponent } from './rqu/index';
import { MorequotationComponent } from './morequotation/index';
import { AuthGuard } from './_guards/index';
import { MyquotationComponent } from './myquotation/index';


const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
            { path: 'quatations', component: QuatationsComponent, canActivate: [AuthGuard] },
            { path: 'quotsummary', component: QuotsummaryComponent, canActivate: [AuthGuard] },
            { path: 'claims', component: ClaimsComponent, canActivate: [AuthGuard] },
            { path: 'myquotation', component: MyquotationComponent, canActivate: [AuthGuard] },
            { path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard] },
            { path: 'vquery', component: VqueryComponent, canActivate: [AuthGuard] },
            { path: 'query', component: QueryComponent, canActivate: [AuthGuard] },
            { path: 'more', component: MorequotationComponent , canActivate: [AuthGuard] },
            { path: 'rqu', component: RquComponent, canActivate: [AuthGuard] }]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register1', component: Register1Component },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes); 