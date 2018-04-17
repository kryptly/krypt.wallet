import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { TradeComponent } from './trade/trade.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BuyComponent } from './trade/buy/buy.component';
import { SellComponent } from './trade/sell/sell.component';

import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';

import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { TradeService } from './services/trade.service';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TradeComponent,
    PortfolioComponent,
    BuyComponent,
    SellComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TradeService,
    UserService,
    DataService,
    AuthService,
    {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
