import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

import { User } from "../../domain/auth/authCredentialsTypes";
import { Product } from "../../domain/products/productsTypes";
import { Order } from "../../domain/orders/ordersTypes";

const UserModel: ModelDefinition<User> = Model.extend({});
const ProductModel: ModelDefinition<Product> = Model.extend({});
const OrderModel: ModelDefinition<Order> = Model.extend({});

export const models = {
  user: UserModel,
  product: ProductModel,
  order: OrderModel,
}