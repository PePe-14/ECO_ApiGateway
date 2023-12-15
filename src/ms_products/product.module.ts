import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_SERVICE_NAME, protobufPackage } from './product.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: protobufPackage,
          protoPath: join('node_modules/microservicios/proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
