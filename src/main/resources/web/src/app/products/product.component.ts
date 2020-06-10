import { Component,OnInit } from '@angular/core';
import { IProduct } from './product';
@Component({
  selector: 'pm-products',
  templateUrl: './product.component.html',
  styles:['./product.component.css'],
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';
  filterBoxLabel: string = 'Filter by:';
  filterValueLabel ='Filtered by:';
  showImageButton ='Show Image';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage =true;
  _listFilter: string = '';
  get listFilter(): string {
  	return this._listFilter;
  }
  set listFilter(value:string)  {
  	this._listFilter =value;
  	this.filteredList = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  	console.log(value);
  }
  filteredList: IProduct[];
  
  constructor() {
  	this.filteredList = this.products;
  }
  products: IProduct[] = [
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2019",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "starRating": 4.2,
      "imageUrl": "assets/images/garden_cart.png"
    },
    {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2019",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "starRating": 4.8,
      "imageUrl": "assets/images/hammer.png"
    }
  ];
  toggleImage(): void{
 	 this.showImage = !this.showImage;
  }
  
  ngOnInit(): void{
  	console.log('Inside oninit');
  }
  
  performFilter(filterValue:string) : IProduct[] {
     return  this.products.filter((product) =>
  	 product.productName.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1);
  	
  
  }
  
}
