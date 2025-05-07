import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../product/product.entity';
import { SalesOrder } from './sales-order.entity';

@Entity('sales_order_items')
export class SalesOrderItem {
  @ApiProperty({ description: 'Sales order item ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Sales order', type: () => SalesOrder })
  @ManyToOne(() => SalesOrder, (salesOrder) => salesOrder.items)
  salesOrder: SalesOrder;

  @ApiProperty({ description: 'Sales order ID' })
  @Column()
  sales_order_id: string;

  @ApiProperty({ description: 'Product', type: () => Product })
  @ManyToOne(() => Product)
  product: Product;

  @ApiProperty({ description: 'Product ID' })
  @Column()
  product_id: string;

  @ApiProperty({ description: 'Quantity of items' })
  @Column()
  quantity: number;
} 