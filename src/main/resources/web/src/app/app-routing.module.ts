import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { CustomerComponent } from './customers/customer.component';
import { CustomerRComponent } from './customersR/rcustomer.component';


@NgModule({
imports: [
	 RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'cart', component: CartComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'Rcustomer', component: CustomerRComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}

  ])
],
exports: [ RouterModule ]
})

export class AppRoutingModule{ }