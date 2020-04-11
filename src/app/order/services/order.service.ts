import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from '../../endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private http: HttpClient
  ) {
  }

  async getClientSecret(productId: number): Promise<{ client_secret: string }> {
    return this.http.get<{ client_secret: string }>(`${ENDPOINTS.CREATE_PAYMENT_INTENT}/${productId}/`).toPromise();
  }
}
