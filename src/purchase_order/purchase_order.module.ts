import { Module } from "@nestjs/common";
import { PurchaseOrderController } from "./purchase_order.controller";
import { PurchaseOrderService } from "./purchase_order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseOrder } from "./purchase_order.entity";
import { PurchaseOrderItem } from './purchase_order_item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderItem])
    ],
    controllers: [PurchaseOrderController],
    providers: [PurchaseOrderService],
    exports: [PurchaseOrderService]
})
export class PurchaseOrderModule {} 
