import {UserModel} from '../../user.model';
import {ProductModel} from './product.model';

export class OrderModel {
    id: number;
    customer: UserModel;
    product: ProductModel;
    state: number;
    date_created: string;
    date_last_updated: string;
}
