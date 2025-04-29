import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(createProductDto: CreateCategoryDto): Promise<Category> {
    const product = this.categoryRepository.create(createProductDto); // Tạo sản phẩm mới từ DTO
    return this.categoryRepository.save(product); // Lưu vào DB
  }
}
