import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TradeService } from '../../services/trade.service'
import { environment } from '../../../environments/environment';

import { Price } from '../../models/price.model';

@Component({
  selector: 'buy-component',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  public currentCurrency : string = 'BTC';
  public price : Observable<Price>;

  constructor(private _tradeService : TradeService) { }

  ngOnInit() {
    this.initPrice();
  }

  private initPrice() {
    if (!environment.production) console.log('initPrice');

    this._tradeService.getPrice(this.currentCurrency);

  }
}
