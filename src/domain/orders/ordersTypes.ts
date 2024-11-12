import { PageParams } from "../../services/api/apiTypes";

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItemAPI[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface OrderItemAPI {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderAPI {
  id: string;
  userId: string;
  items: OrderItemAPI[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersAPIRequest extends PageParams {}

export interface CreateOrderRequest {
  userId: string;
  items: OrderItemAPI[];
  totalAmount: number;
}
