import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/category.entity';
import { InventoryAudit } from 'src/inventory_audits/inventory_audits.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the product' })
    id: number;

    @Column({ unique: true, nullable: true })
    @ApiProperty({ description: 'The SKU of the product' })
    SKU: string;

    @Column()
    @ApiProperty({ description: 'The name of the product' })
    name: string;

    @Column()
    @ApiProperty({ description: 'The price of the product' })
    price: number;

    @Column()
    @ApiProperty({ description: 'The unit of the product' })
    unit: string;

    @Column()
    @ApiProperty({ description: 'The description of the product' })
    description: string;

    @Column()
    @ApiProperty({ description: 'The category_id of the product' })
    category_id: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => InventoryAudit, (inventory) => inventory.product)
    inventory: InventoryAudit[];
}
