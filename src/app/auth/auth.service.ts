import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, timeoutWith } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { DataService } from '../services/data.service';
import { userServerInfo } from '../../environments/environment';

@Injectable()
export class AuthService {

  private token : string = "no-auth";

  constructor(private dataService : DataService) { }

  public login(username: string, password: string) : Observable<boolean> {

    const data = {
      username : username,
      password : password
    };
    interface LoginResponse {
      token : string;
    }
    return this.dataService.postJson<LoginResponse>(userServerInfo.serverAddress + '/api/v1/login', data)
        .map((response : LoginResponse) => {
            if(!response) return false;
            // login successful if there's a jwt token in the response
            let token = response && response.token;

            if (token) {
                // set token property
                this.token = token.replace('JWT ', "");
                console.log(this.token);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getToken() : string {
      return this.token;
    }

}
