import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { LocationWarehouse as Location } from '../location/location.entity';

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  TRANSFER = 'TRANSFER',
}

export enum ReferenceType {
  PO = 'PO',
  SO = 'SO',
}

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  product_id: string;

  @ManyToOne(() => Location, { nullable: true })
  fromLocation: Location;

  @Column({ nullable: true })
  from_location_id: string;

  @ManyToOne(() => Location, { nullable: true })
  toLocation: Location;

  @Column({ nullable: true })
  to_location_id: string;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  movement_type: MovementType;

  @Column({
    type: 'enum',
    enum: ReferenceType,
  })
  reference_type: ReferenceType;

  @Column()
  reference_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
} 