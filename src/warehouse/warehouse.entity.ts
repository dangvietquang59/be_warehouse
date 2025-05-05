import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
