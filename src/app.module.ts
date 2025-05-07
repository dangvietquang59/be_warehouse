import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { HealthModule } from './health/health.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { Supplier } from './supplier/supplier.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Warehouse } from './warehouse/warehouse.entity';
import { LocationWarehouseModule } from './location/location.module';
import { LocationWarehouse } from './location/location.entity';
import { PurchaseOrder } from './purchase_order/purchase_order.entity';
import { PurchaseOrderItem } from './purchase_order/purchase_order_item.entity';
import { PurchaseOrderModule } from './purchase_order/purchase_order.module';
import { InventoryAudit } from './inventory_audits/inventory_audits.entity';
import { InventoryAuditsModule } from './inventory_audits/inventory_audits.module';
import { Customer } from './customer/customer.entity';
import { SalesOrder } from './sales-order/sales-order.entity';
import { SalesOrderItem } from './sales-order/sales-order-item.entity';
import { StockMovement } from './stock-movement/stock-movement.entity';
import { ActivityLog } from './activity-log/activity-log.entity';
import { CustomerModule } from './customer/customer.module';
import { SalesOrderModule } from './sales-order/sales-order.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [
                    Product,
                    User,
                    Role,
                    Category,
                    Supplier,
                    Warehouse,
                    LocationWarehouse,
                    PurchaseOrder,
                    PurchaseOrderItem,
                    InventoryAudit,
                    Customer,
                    SalesOrder,
                    SalesOrderItem,
                    StockMovement,
                    ActivityLog,
                ],
                synchronize: true,
                logging: true,
            }),
            inject: [ConfigService],
        }),
        HealthModule,
        AuthModule,
        UserModule,
        RoleModule,
        ProductModule,
        CategoryModule,
        WarehouseModule,
        SupplierModule,
        LocationWarehouseModule,
        PurchaseOrderModule,
        InventoryAuditsModule,
        CustomerModule,
        SalesOrderModule,
        StockMovementModule,
        ActivityLogModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
