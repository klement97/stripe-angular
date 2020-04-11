import {environment} from '../environments/environment';

const ORDER = `${environment.apiHost}/order`;
const CREATE_PAYMENT_INTENT = `${ORDER}/create/payment/intent`;

const PRODUCT = `${ORDER}/product`;


export const ENDPOINTS = {
  CREATE_PAYMENT_INTENT,
  PRODUCT
};
