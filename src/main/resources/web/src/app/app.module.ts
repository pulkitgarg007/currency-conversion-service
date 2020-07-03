import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './products/product.module';
import { AppComponent } from './app.component';
import { WelcomeComponent} from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerComponent } from './customers/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRComponent } from './customersR/rcustomer.component';
@NgModule({
  declarations: [AppComponent, WelcomeComponent, CustomerComponent, CustomerRComponent
    ],
  imports: [ BrowserModule, ProductModule,
     HttpClientModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
