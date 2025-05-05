import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[Category[], number]> {
        const [categories, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return [categories, total];
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    async update(id: number, dto: CreateCategoryDto): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
        await this.categoryRepository.update(id, dto);
        const updatedCategory = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!updatedCategory) {
            throw new NotFoundException(
                `Category with id ${id} not found after update`,
            );
        }
        return updatedCategory;
    }

    async remove(id: number): Promise<void> {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        await this.categoryRepository.delete(id);
    }
}
