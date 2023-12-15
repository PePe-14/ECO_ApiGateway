import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_SERVICE_NAME, protobufPackage } from './order.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: protobufPackage,
          protoPath: join('node_modules/microservicios/proto/order.proto'),
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
