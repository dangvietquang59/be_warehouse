import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the supplier' })
    id: number;

    @Column({ nullable: false })
    @ApiProperty({ description: 'The name of the supplier' })
    name: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The phone number of the supplier' })
    phone_number: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The email of the supplier' })
    email: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'The address of the supplier' })
    address: string;
}
