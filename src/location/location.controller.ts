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
import { LocationWarehouseService } from './location.service';
import { CreateLocationWarehouseDto } from './dto/create-location.dto';
import { LocationWarehouse } from './location.entity';

@ApiTags('Locations')
@Controller('api/locations')
export class LocationWarehouseController {
    constructor(
        private readonly locationWarehouseService: LocationWarehouseService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Return all categories' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[LocationWarehouse[], number]> {
        return this.locationWarehouseService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({
        status: 201,
        description: 'The location warehouse has been successfully created.',
        type: LocationWarehouse,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createLocationWarehouseDto: CreateLocationWarehouseDto,
    ): Promise<ApiResponseDto<any>> {
        const locationWarehouse = await this.locationWarehouseService.create(
            createLocationWarehouseDto,
        );
        return new ApiResponseDto(
            201,
            locationWarehouse,
            'LocationWarehouse created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a location warehouse' })
    @ApiResponse({
        status: 200,
        description: 'Updated successfully',
        type: LocationWarehouse,
    })
    async update(
        @Param('id') id: number,
        @Body() dto: CreateLocationWarehouseDto,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.locationWarehouseService.update(id, dto);
        return new ApiResponseDto(
            200,
            updated,
            'LocationWarehouse updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a location warehouse' })
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    async remove(@Param('id') id: number): Promise<ApiResponseDto<any>> {
        await this.locationWarehouseService.remove(id);
        return new ApiResponseDto(
            200,
            null,
            'LocationWarehouse deleted successfully',
        );
    }
}
