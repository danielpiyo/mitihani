import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ClaimsComponent } from './claims/index';
import{ ProductsComponent } from './products/index';
import { QuatationsComponent } from './quatations/index';
import { PoliciesComponent } from './policies/index';
import { QueryComponent } from './query/index';
import { RenewComponent } from './renew/index';
import { ProfileComponent } from './profile/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'claims', component: ClaimsComponent, canActivate: [AuthGuard] },
    { path: 'query', component: QueryComponent, canActivate: [AuthGuard] },
    { path: 'renew', component: RenewComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'quatations', component: QuatationsComponent, canActivate: [AuthGuard] },
    { path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard] },
   

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);