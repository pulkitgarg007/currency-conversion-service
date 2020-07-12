import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	 private productsUrl = 'api/products/products.json';
	 private productUrl = 'api/products/product.json';
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
    	return this.httpClient.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(data => console.log('All: ')),
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: number): Observable<{}>{
	console.log(productId);
	return;
  }
  
  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productUrl}/${id}`;
    return this.httpClient.get<IProduct>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      productId: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

}
