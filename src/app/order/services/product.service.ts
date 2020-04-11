import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../endpoints';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = {};

  constructor(
      private http: HttpClient
  ) {
  }

  getProductList(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${ENDPOINTS.PRODUCT}/`)
        .pipe(
            map(products => {
              this.cacheProducts(products);
              return products;
            })
        );
  }

  cacheProducts(products) {
    products.forEach(product => {
      Object.defineProperty(this.products, product.id, {value: product, writable: true});
    });
  }

  getProduct(id): ProductModel {
    if (this.products) {
      return this.products[id];
    }
  }
}
