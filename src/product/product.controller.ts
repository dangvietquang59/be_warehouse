import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Products')
@Controller('api/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Return all products' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[Product[], number]> {
        return this.productService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return a product by ID',
        type: Product,
    })
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({
        status: 201,
        description: 'The product has been successfully created.',
        type: Product,
    })
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<ApiResponseDto<any>> {
        const product = await this.productService.create(createProductDto);
        return new ApiResponseDto(201, product, 'Product created successfully');
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update product by ID' })
    @ApiResponse({
        status: 200,
        description: 'Product updated successfully',
        type: Product,
    })
    async update(
        @Param('id') id: number,
        @Body() updateProductDto: CreateProductDto,
    ): Promise<ApiResponseDto<any>> {
        const updatedProduct = await this.productService.update(
            id,
            updateProductDto,
        );
        return new ApiResponseDto(
            200,
            updatedProduct,
            'Product updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete product by ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.productService.remove(+id);
        return new ApiResponseDto(200, null, 'Product deleted successfully');
    }
}
