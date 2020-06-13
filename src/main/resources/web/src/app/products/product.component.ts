import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
  selector: 'pm-products',
  templateUrl: './product.component.html',
  styles: ['./product.component.css']
})
export class ProductListComponent implements OnInit{
  productservice: ProductService;
  pageTitle = 'Product List';
  filterBoxLabel = 'Filter by:';
  filterValueLabel = 'Filtered by:';
  showImageButton = 'Show Image';
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  listfilter = '';
  errorMessage: string;
 constructor(private productService: ProductService) {
   this.productService = productService;
  }

  filteredList: IProduct[];

  products: IProduct[];

  get listFilter(): string {
  	return this.listfilter;
  }
  set listFilter(value: string)  {
  	this.listfilter = value;
  	this.filteredList = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  	console.log(value);
  }

  toggleImage(): void{
this.showImage = !this.showImage;
  }

  ngOnInit(): void{
    this.productService.getProductsFromHttp().subscribe({
      next(products) {
        this.products = products;
      },
      error(err){
        this.errorMessage = err;
      }
    });
    this.products = this.productService.getProducts();
    this.filteredList = this.products;
  	 console.log('Inside oninit');
  }

  onRatingClicked(message: string): void{
  	this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterValue: string): IProduct[] {
     return  this.products.filter((product) =>
  	 product.productName.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1);
  }

}
