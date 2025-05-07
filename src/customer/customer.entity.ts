import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SalesOrder } from '../sales-order/sales-order.entity';

@Entity('customers')
export class Customer {
  @ApiProperty({ description: 'Customer ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Customer name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Customer contact information', type: 'object' })
  @Column('jsonb')
  contact_info: Record<string, any>;

  @ApiProperty({ description: 'Customer address' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Customer sales orders', type: [SalesOrder] })
  @OneToMany(() => SalesOrder, (salesOrder) => salesOrder.customer)
  salesOrders: SalesOrder[];
} 