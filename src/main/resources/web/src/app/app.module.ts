import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './products/product.module';
import { AppComponent } from './app.component';
import { WelcomeComponent} from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [AppComponent, WelcomeComponent
    ],
  imports: [ BrowserModule, ProductModule,
     HttpClientModule, AppRoutingModule, BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
