import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../customer/customer.entity';
import { SalesOrderItem } from './sales-order-item.entity';

export enum SalesOrderStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

@Entity('sales_orders')
export class SalesOrder {
  @ApiProperty({ description: 'Sales order ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Customer', type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.salesOrders)
  customer: Customer;

  @ApiProperty({ description: 'Customer ID' })
  @Column()
  customer_id: string;

  @ApiProperty({ description: 'Order status', enum: SalesOrderStatus })
  @Column({
    type: 'enum',
    enum: SalesOrderStatus,
    default: SalesOrderStatus.DRAFT,
  })
  status: SalesOrderStatus;

  @ApiProperty({ description: 'Creation timestamp' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ description: 'Delivery date' })
  @Column({ type: 'date' })
  delivery_date: Date;

  @ApiProperty({ description: 'Order items', type: [SalesOrderItem] })
  @OneToMany(() => SalesOrderItem, (item) => item.salesOrder)
  items: SalesOrderItem[];
} 