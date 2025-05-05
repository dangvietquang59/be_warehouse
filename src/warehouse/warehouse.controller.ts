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
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './warehouse.entity';
import { CreateWareHouseDto } from './dto/create-warehouse.dto';

@ApiTags('Warehouses')
@Controller('api/warehouses')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    @ApiOperation({ summary: 'Get all warehouses' })
    @ApiResponse({ status: 200, description: 'Return all warehouses' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[Warehouse[], number]> {
        return this.warehouseService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get warehouse by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return a warehouse by ID',
        type: Warehouse,
    })
    async findOne(@Param('id') id: number): Promise<Warehouse> {
        return this.warehouseService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new warehouse' })
    @ApiResponse({
        status: 201,
        description: 'The warehouse has been successfully created.',
        type: Warehouse,
    })
    async create(
        @Body() createWarehouseDto: CreateWareHouseDto,
    ): Promise<ApiResponseDto<any>> {
        const warehouse =
            await this.warehouseService.create(createWarehouseDto);
        return new ApiResponseDto(
            201,
            warehouse,
            'warehouse created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update warehouse by ID' })
    @ApiResponse({
        status: 200,
        description: 'warehouse updated successfully',
        type: Warehouse,
    })
    async update(
        @Param('id') id: number,
        @Body() updateWarehouseDto: CreateWareHouseDto,
    ): Promise<ApiResponseDto<any>> {
        const updatedwarehouse = await this.warehouseService.update(
            id,
            updateWarehouseDto,
        );
        return new ApiResponseDto(
            200,
            updatedwarehouse,
            'warehouse updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete warehouse by ID' })
    @ApiResponse({ status: 200, description: 'warehouse deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.warehouseService.remove(+id);
        return new ApiResponseDto(200, null, 'warehouse deleted successfully');
    }
}
