import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';


@NgModule({
imports: [
	 RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'cart', component: CartComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}

  ])
],
exports: [ RouterModule ]
})

export class AppRoutingModule{ }