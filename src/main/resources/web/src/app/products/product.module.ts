import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConversionComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
