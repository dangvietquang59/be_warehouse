import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LocationWarehouse } from 'src/location/location.entity';
import { InventoryAudit } from 'src/inventory_audits/inventory_audits.entity';

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the warehouse' })
    id: number;

    @Column({ nullable: false })
    @ApiProperty({ description: 'The name of the warehouse' })
    name: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The phone number of the warehouse' })
    location: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The email of the warehouse' })
    manager_name: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'The address of the warehouse' })
    created_at: string;

    @UpdateDateColumn()
    @ApiProperty({ description: 'The address of the warehouse' })
    updated_at: string;

    @OneToMany(() => LocationWarehouse, (location) => location.warehouse)
    locations: LocationWarehouse[];

    @OneToMany(() => InventoryAudit, (inventory) => inventory.warehouse)
    inventory: InventoryAudit[];
}
