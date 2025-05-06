import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class InventoryAudit {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the inventory audit' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The id of the warehouse' })
    warehouse_id: number;

    @Column()
    @ApiProperty({ description: 'The id of the product' })
    product_id: number;

    @Column()
    @ApiProperty({ description: 'The expected quantity' })
    expected_qty:number;

    @Column()
    @ApiProperty({ description: 'The actual quantity' })
    actual_qty:number;
    

    @Column()
    @ApiProperty({ description: 'The note of inventory audits' })
    note:string;
 
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventory, { eager: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;

    @ManyToOne(() => Product, (product) => product.inventory, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
