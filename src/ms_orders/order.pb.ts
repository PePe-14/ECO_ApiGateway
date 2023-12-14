/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "orders";

export interface Order {
  id: string;
  customerId: string;
  items: string;
  totalPrice: number;
  status: string;
}

export interface OrderDTO {
  customerId: string;
  /** El mismo formato del Order message */
  items: string;
  totalPrice: number;
}

export interface CreateOrderRequest {
  order: OrderDTO | undefined;
}

export interface OrderList {
  orders: Order[];
}

export interface FindOrderRequest {
  id: string;
}

export interface UpdateOrderRequest {
  id: string;
  order: OrderDTO | undefined;
}

export interface DeleteOrderRequest {
  id: string;
}

export interface Empty {
}

export const ORDERS_PACKAGE_NAME = "orders";

export interface OrderServiceClient {
  createOrder(request: CreateOrderRequest): Observable<Order>;

  findAllOrders(request: Empty): Observable<OrderList>;

  findOneOrder(request: FindOrderRequest): Observable<Order>;

  updateOrder(request: UpdateOrderRequest): Observable<Order>;

  deleteOrder(request: DeleteOrderRequest): Observable<Empty>;
}

export interface OrderServiceController {
  createOrder(request: CreateOrderRequest): Promise<Order> | Observable<Order> | Order;

  findAllOrders(request: Empty): Promise<OrderList> | Observable<OrderList> | OrderList;

  findOneOrder(request: FindOrderRequest): Promise<Order> | Observable<Order> | Order;

  updateOrder(request: UpdateOrderRequest): Promise<Order> | Observable<Order> | Order;

  deleteOrder(request: DeleteOrderRequest): Promise<Empty> | Observable<Empty> | Empty;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder", "findAllOrders", "findOneOrder", "updateOrder", "deleteOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
