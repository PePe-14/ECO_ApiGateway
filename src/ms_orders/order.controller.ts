import { Body, Controller, Delete, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ORDER_SERVICE_NAME,
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetAllOrdersResponse,
  OrderServiceClient,
  GetOrderRequest,
  GetOrderResponse,
} from './order.pb';

@Controller('orders')
export class OrderController implements OnModuleInit {
  private orderService: OrderServiceClient;

  constructor(@Inject(ORDER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>('OrderService');
  }

  @Get()
  getAllOrders(): Observable<GetAllOrdersResponse> {
    const request = {};
    return this.orderService.getAllOrders(request);
  }

  @Get('id')
  getOrderById(@Body() id: GetOrderRequest): Observable<GetOrderResponse> {
    return this.orderService.getOrder(id);
  }

  @Post()
  createOrder(@Body() body: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.orderService.createOrder(body);
  }

  @Delete()
  deleteOrder(@Body() id: DeleteOrderRequest): Observable<DeleteOrderResponse> {
    return this.orderService.deleteOrder(id);
  }
}
