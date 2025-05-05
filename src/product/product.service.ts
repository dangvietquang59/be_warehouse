import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[Product[], number]> {
        const [products, total] = await this.productRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return [products, total];
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const SKU =
            'PROD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const product = this.productRepository.create({
            ...createProductDto,
            SKU,
        });
        return this.productRepository.save(product);
    }

    async findOne(id: number): Promise<Product> {
        const role = await this.productRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async update(
        id: number,
        updateProductDto: CreateProductDto,
    ): Promise<Product> {
        await this.productRepository.update(id, updateProductDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
