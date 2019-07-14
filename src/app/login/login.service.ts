import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';  
import 'rxjs'; //get everything from Rx  
import 'rxjs/add/operator/toPromise';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from './login';

@Injectable()
export class LoginService {
    apiUrl: string = "https://www.api.cloudplace.org:4000/api/loginAdminapp";
    constructor(private http: HttpClient) { }
  
    

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl, { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user; 
            })
            .catch((error: any) => Observable.throw(error.error.message || 'Server error'));  
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}