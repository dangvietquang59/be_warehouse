import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the product' })
  id: number;

  @Column({ unique: true })
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
}
