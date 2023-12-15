import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './ms_users/user.module';
import { ProductModule } from './ms_products/product.module';
import { OrderModule } from './ms_orders/order.module';

@Module({
  imports: [UserModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
