import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { CartComponent } from '../cart/cart.component';
import { ProductAddComponent } from './product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    DialogComponent,
    CartComponent,
    ProductAddComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {path: 'products/:id/edit', component: ProductAddComponent}
    ]),
    SharedModule,
    MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class ProductModule { }
