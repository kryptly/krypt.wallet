import 'rxjs/add/operator/map';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, timeoutWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { tradeServerInfo } from '../../environments/environment'

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  // GET
  public getJson<T>(url: string): Observable<T> {

    return this.http.get<T>(url)
      .pipe(
        tap(data => {
          console.log('DataService : HTTP GET OK');
        }),
        catchError(this.handleError<T>('DataService:getJson'))
      );
  }

  // POST
  public postJson<T>(url : string, data: any): Observable<T> {

    return this.http.post<T>(url, data).pipe(
      tap(data => {
        console.log('DataService : HTTP GET OK');
      }),
      catchError(this.handleError<T>('DataService:postJson'))
    );
  }

  // PUT
  public putJson<T>(url: string, jsonString: any): Observable<T> {

      return this.http.put<T>(url, jsonString);
  }

  // DELETE
  public delete<T>(url: string): Observable<T> {
      return this.http.delete<T>(url);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation : string = 'operation', result?: T) {
    return (error: T): Observable<T> => {

      console.log("error received");

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
