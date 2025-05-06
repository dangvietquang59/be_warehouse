import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "src/supplier/supplier.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderItem } from "./purchase_order_item.entity";

@Entity()
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the purchase order' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The supplier ID of the purchase order' })
    supplier_id: number;

    @Column(
        {
            type: 'enum',
            enum: ['DRAFT', 'CONFIRMED', 'RECEIVED', 'CANCELLED'],
            default: 'DRAFT'
        }
    )
    @ApiProperty({ description: 'The status of the purchase order' })
    status: string;

    @Column()
    @ApiProperty({ description: 'The created by of the purchase order' })
    created_by: number; 

    @Column()
    @ApiProperty({ description: 'The expected delivery date of the purchase order' })
    expected_delivery_date: Date;

    @Column()
    @ApiProperty({ description: 'The created at of the purchase order' })
    created_at: Date;

    @Column()
    @ApiProperty({ description: 'The updated at of the purchase order' })
    updated_at: Date;
    
    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    user: User;

    @OneToMany(() => PurchaseOrderItem, item => item.purchase_order)
    items: PurchaseOrderItem[];
}
