
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { DataService } from './data.service';
import { tradeServerInfo } from '../../environments/environment'

import { Price } from '../models/price.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TradeService {

  private baseUrl: string = tradeServerInfo.serverAddress;

  constructor(private http : HttpClient, private _dataService: DataService) {

  }

  public getPrice<T>(currency: string): Observable<Price> {

    var url = this.baseUrl + tradeServerInfo.priceApi.replace('{currency}', currency);
    console.log('getting url :' + url);

    return this._dataService.getJson<Price>(url)
      .catch((e: any) => {

        console.log("sometings oep");
        return Observable.throw(this.errorHandler(e));
      });
  }

  public getAvailableCurrencies<T>(): Observable<T> {

    var url = this.baseUrl + tradeServerInfo.availableCurrenciesApi;

    console.log('getting url :' + url);

    return this._dataService.getJson<T>(url);
  }

  private errorHandler(error: any): void {
    console.log('errorhandler called');
    console.log(error);
    return error("test");
  }

}
