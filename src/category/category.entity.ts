import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The ID of the category' })
    id: number;

    @Column()
    @ApiProperty({ description: 'The name of the category' })
    name: string;

    @Column()
    @ApiProperty({ description: 'The description of the category' })
    description: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
