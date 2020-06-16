import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	 private productUrl = 'api/products/products.json';
	constructor(private httpClient: HttpClient){
	}

	getProductsFromHttp(): Observable<IProduct[]>{
		 return this.httpClient.get<IProduct[]>('http://localhost:8100/products').pipe(
			 tap(data => console.log('All : ' + JSON.stringify(data) )),
			 catchError(this.handleError));
	}
	handleError(handleError: any): Observable<IProduct[]> {
		throw new Error("Method not implemented.");
	}
	getProductsFromJson(): Observable<IProduct[]> {
    	return this.httpClient.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ')),
        catchError(this.handleError)
      );
  }

}
