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
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Return all categories' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[Category[], number]> {
        return this.categoryService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
        type: Category,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<ApiResponseDto<any>> {
        const category = await this.categoryService.create(createCategoryDto);
        return new ApiResponseDto(
            201,
            category,
            'Category created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({
        status: 200,
        description: 'Updated successfully',
        type: Category,
    })
    async update(
        @Param('id') id: number,
        @Body() dto: CreateCategoryDto,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.categoryService.update(id, dto);
        return new ApiResponseDto(
            200,
            updated,
            'Category updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    async remove(@Param('id') id: number): Promise<ApiResponseDto<any>> {
        await this.categoryService.remove(id);
        return new ApiResponseDto(200, null, 'Category deleted successfully');
    }
}
