import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products' })
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
