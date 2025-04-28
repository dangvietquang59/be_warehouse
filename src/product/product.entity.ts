import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the product' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The price of the product' })
  price: number;
}
