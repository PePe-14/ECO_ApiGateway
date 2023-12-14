import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_SERVICE_NAME, protobufPackage } from './users.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: protobufPackage,
          protoPath: join('node_modules/microservicios/proto/users.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
