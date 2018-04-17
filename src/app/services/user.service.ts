import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap, timeoutWith } from 'rxjs/operators';

import { DataService } from './data.service';
import { userServerInfo } from '../../environments/environment'
import { KeyValue } from '../models/keyvalue';
import { UserPortfolio } from '../models/userportfolio.model';

import { UserProfile } from '../models/userprofile.model';

@Injectable()
export class UserService {

  private baseUrl: string = userServerInfo.serverAddress;
  private currentUserHash : string = 'tasty#';

  constructor(private _dataService: DataService) {
    this.init();
  }

  private init() {

  }

  public getUserProfile() : Observable<UserProfile> {

    var url = this.baseUrl + userServerInfo.baseinfoApi.replace('{id}', "");

    return this._dataService.getJson<any>(url)
    .pipe(
      // try parsing data to model
      tap(u => {

        let p : UserProfile = new UserProfile();
        p.authToken = u.userH;

        // personal info
        p.firstName = u.firstName;
        p.lastName = "tobedefined";

        return p;
      }),
      catchError(this.handleError<UserProfile>('UserService:getUserProfile', new UserProfile()))
    );
  }


  private getUserPortfolio() : Observable<UserPortfolio> {

    var url = this.baseUrl + userServerInfo.baseinfoApi.replace('{userHash}', this.currentUserHash);

    return this._dataService.getJson<any>(url)
    .pipe(
      // try parsing data to model
      tap(p => {

        // portfolio
        let portfolio = new UserPortfolio();

        let balance : KeyValue[] = [];
        balance.push(new KeyValue('BTC',0.07654));

        return portfolio;
      }),
      catchError(this.handleError<UserPortfolio>('UserService:getUserPortfolio', new UserPortfolio()))
    );
  }

  private handleError<T>(operation : string = 'operation', result?: T) {

    return (error: T): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




  // TODO : hash will come from login service

  setUserHash(userHash : string) {
    this.currentUserHash = userHash;
  }
  getUserHash() : string {
    return this.currentUserHash;
  }



}
