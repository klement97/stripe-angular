import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductModel[]>;

  constructor(
      private breakpointObserver: BreakpointObserver,
      private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProductList();
  }
}
