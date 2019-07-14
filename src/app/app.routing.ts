import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

import { Register1Component } from './register1/index';

import { ClassLevelComponent } from './class/index';

import { QuestionComponent } from './question/index';
import { CompleteComponent} from './complete/index';
import { ProfileComponent } from './profile/index';
import { IncompleteComponent} from './incomplete/index';
import { AuthGuard } from './_guards/index';
import { EditQComponent } from './editquestion/index';



const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'set', component: ClassLevelComponent, canActivate: [AuthGuard] },

            { path: 'questions', component: EditQComponent, canActivate: [AuthGuard] },
            { path: 'quiz', component: QuestionComponent, canActivate: [AuthGuard] },
            { path: 'unapproved', component: IncompleteComponent, canActivate: [AuthGuard] },
            { path: 'approved', component: CompleteComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register1', component: Register1Component },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

//export const routing = RouterModule.forRoot(appRoutes); 
export const routing = RouterModule.forRoot(appRoutes, { useHash: true }); 