import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../products/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
   pageTitle = 'Cart Details';
   cartList: string;
  constructor(private route: ActivatedRoute,
              private router: Router
             ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe({
      next: products => {
        this.cartList = products.getAll( "params")[0];
         console.log(products);
      }
    });
      console.log(this.cartList);
      
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
