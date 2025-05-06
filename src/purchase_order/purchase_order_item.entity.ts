import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrder } from "./purchase_order.entity";
import { Product } from "src/product/product.entity";

@Entity()
export class PurchaseOrderItem {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the purchase order item' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The purchase order ID' })
    purchase_order_id: number;

    @Column()
    @ApiProperty({ description: 'The product ID' })
    product_id: number;

    @Column()
    @ApiProperty({ description: 'The quantity of the product' })
    quantity: number;

    @ManyToOne(() => PurchaseOrder, purchaseOrder => purchaseOrder.items)
    @JoinColumn({ name: 'purchase_order_id' })
    purchase_order: PurchaseOrder;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
} 