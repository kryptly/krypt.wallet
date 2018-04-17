import { Component, OnInit } from '@angular/core';

import { TradeService } from '../services/trade.service'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public currentCurrency : string = 'BTC';
  public availableCurrencies : string[] = ['BTC', 'ETH'];

  constructor(private _tradeService : TradeService) { }

  ngOnInit() {
    this.initCurrencies();

  }

  private initCurrencies() {
    if (!environment.production) console.log('initCurrencies');

    this._tradeService.getAvailableCurrencies()
      .subscribe((data : string[]) => {
        this.availableCurrencies = data;
      },
      errors => {
          //log something
          //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
          console.log("shit went wrong yo!");
      },
      // success
      () => {
          //log something
          //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
          //this._slimLoadingBarService.complete();
          console.log("succes! we've got the currencies");
      });

  }
}
