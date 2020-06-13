import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(private httpClient: HttpClient){
	}

	getProductsFromHttp(): Observable<IProduct[]>{
		 return this.httpClient.get<IProduct[]>('url').pipe(
			 tap(data => console.log('All : ' + JSON.stringify(data) )),
			 catchError(this.handleError));
	}
	handleError(handleError: any): Observable<IProduct[]> {
		throw new Error("Method not implemented.");
	}
	
	getProducts(): IProduct[] {
		
		return [
			{
				productId: 2,
				productName: 'Garden Cart',
				productCode: 'GDN-0023',
				releaseDate: 'March 18, 2019',
				description: '15 gallon capacity rolling garden cart',
				price: 32.99,
				starRating: 3,
				imageUrl: 'assets/images/garden_cart.png'
			},
			{
				productId: 5,
				productName: 'Hammer',
				productCode: 'TBX-0048',
				releaseDate: 'May 21, 2019',
				description: 'Curved claw steel hammer',
				price: 8.9,
				starRating: 4.8,
				imageUrl: 'assets/images/hammer.png'
			},
			{
				productId: 6,
				productName: 'Spade',
				productCode: 'TBX-0049',
				releaseDate: 'May 21, 2019',
				description: 'Curved claw steel spade',
				price: 8.9,
				starRating: 4,
				imageUrl: 'assets/images/hammer.png'
			}
		];
	}
}
