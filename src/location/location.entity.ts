import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Warehouse } from 'src/warehouse/warehouse.entity';

@Entity()
export class LocationWarehouse {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the warehouse location' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The name of the warehouse location' })
    name: string;

    @Column()
    @ApiProperty({ description: 'The id of the warehouse location' })
    warehouse_id: number;

    @Column()
    @ApiProperty({ description: 'The code of the warehouse location' })
    code: string;

    @Column()
    @ApiProperty({ description: 'The description of the warehouse location' })
    description: string;
    
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.locations, { eager: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse;
}
