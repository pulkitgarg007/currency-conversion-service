import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormControl, FormBuilder, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './product-add.component.html',
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  pageTitle = 'Add a Product';
  errorMessage: string;
  product: IProduct;
  private sub: Subscription;
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: '',
      price: '',
      releaseDate: '',
      description: '',
      tags : this.fb.array([])
    });
    
    // Read the product Id from the route parameter
    this.sub = this.router.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    );
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private productService: ProductService ) { }

  deleteProduct(){
    if (this.product.productId === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.productId)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }
  deleteTag(index: any){
    this.tags.removeAt(index);
    this.tags.markAsDirty();
    console.log('Delete Tag');
  }
  addTag(){
     this.tags.push(new FormControl());
     console.log('Add Tag');
  }
  save() {
    console.log(this.productForm);
    console.log('Saved: ' + JSON.stringify(this.productForm.value));
  }

   onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
  
  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe({
        next: (product: IProduct) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }
  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.productId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }
}
