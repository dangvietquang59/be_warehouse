import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderController } from './sales-order.controller';
import { SalesOrder } from './sales-order.entity';
import { SalesOrderItem } from './sales-order-item.entity';
import { CustomerModule } from '../customer/customer.module';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SalesOrder, SalesOrderItem]),
        CustomerModule,
        ProductModule,
    ],
    controllers: [SalesOrderController],
    providers: [SalesOrderService],
    exports: [SalesOrderService],
})
export class SalesOrderModule {} 