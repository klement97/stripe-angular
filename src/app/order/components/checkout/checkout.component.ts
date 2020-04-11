import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy, AfterViewInit {
  loading = false;
  clientSecret: string;
  product: ProductModel = new ProductModel();

  constructor(
      private cd: ChangeDetectorRef,
      private productService: ProductService,
      private route: ActivatedRoute,
      private orderService: OrderService
  ) {
  }

  @ViewChild('cardElement') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;

  ngOnInit(): void {
    this.getProduct();
    this.getClientSecret().then();
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to avoid memory leaks
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit() {
    this.initiateCardElement();
  }

  getProduct() {
    // this.product = this.productService.getProduct(productId);
    this.product.id = +this.route.snapshot.paramMap.get('product_id');
  }

  async getClientSecret() {
    const res = await this.orderService.getClientSecret(this.product.id);
    this.clientSecret = res.client_secret;
  }


  /** Create a card element using Stripe Elements and mounts it to 'this.card'. */
  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', {cardStyle});
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }


  /**
   * Takes error attribute from object given and set it's value to 'this.cardError'
   */
  onChange({error}) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }

    this.cd.detectChanges();
    // using ChangeDetector to detect changes for 'this.cardError'
  }

  async checkout(e) {
    e.preventDefault();
    this.loading = true;
    const {error, paymentIntent} = await stripe.confirmCardPayment(this.clientSecret, {payment_method: {card: this.card}});
    this.loading = false;
    if (error) {
      this.onError(error);
    } else {
      this.onSuccess(paymentIntent);
    }
  }


  onSuccess(paymentIntent) {
    console.log(paymentIntent);
  }


  /** Takes an error and set's the 'error.message' value to 'this.cardError'
   * @param error        Error object from Stripe
   */
  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
