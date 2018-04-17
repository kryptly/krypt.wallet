import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TradeComponent } from './trade/trade.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    },
    {
        path: 'trade',
        component: TradeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PortfolioComponent, TradeComponent];
