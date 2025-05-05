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
import { Supplier } from './supplier.entity';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@ApiTags('Suppliers')
@Controller('api/suppliers')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) {}

    @Get()
    @ApiOperation({ summary: 'Get all suppliers' })
    @ApiResponse({ status: 200, description: 'Return all suppliers' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[Supplier[], number]> {
        return this.supplierService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get supplier by ID' })
    @ApiResponse({
        status: 200,
        description: 'Return a supplier by ID',
        type: Supplier,
    })
    async findOne(@Param('id') id: number): Promise<Supplier> {
        return this.supplierService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new supplier' })
    @ApiResponse({
        status: 201,
        description: 'The supplier has been successfully created.',
        type: Supplier,
    })
    async create(
        @Body() createSupplierDto: CreateSupplierDto,
    ): Promise<ApiResponseDto<any>> {
        const supplier = await this.supplierService.create(createSupplierDto);
        return new ApiResponseDto(
            201,
            supplier,
            'supplier created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update supplier by ID' })
    @ApiResponse({
        status: 200,
        description: 'supplier updated successfully',
        type: Supplier,
    })
    async update(
        @Param('id') id: number,
        @Body() updateSupplierDto: CreateSupplierDto,
    ): Promise<ApiResponseDto<any>> {
        const updatedsupplier = await this.supplierService.update(
            id,
            updateSupplierDto,
        );
        return new ApiResponseDto(
            200,
            updatedsupplier,
            'supplier updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete supplier by ID' })
    @ApiResponse({ status: 200, description: 'supplier deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.supplierService.remove(+id);
        return new ApiResponseDto(200, null, 'supplier deleted successfully');
    }
}
