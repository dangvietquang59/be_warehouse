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
import { StockMovementService } from './stock-movement.service';
import { StockMovement } from './stock-movement.entity';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Stock Movements')
@Controller('api/stock-movements')
export class StockMovementController {
    constructor(private readonly stockMovementService: StockMovementService) {}

    @Get()
    @ApiOperation({ summary: 'Get all stock movements' })
    @ApiResponse({ status: 200, description: 'Return all stock movements' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        return this.stockMovementService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new stock movement' })
    @ApiResponse({
        status: 201,
        description: 'The stock movement has been successfully created.',
        type: StockMovement,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createStockMovementDto: CreateStockMovementDto,
    ): Promise<ApiResponseDto<any>> {
        const stockMovement = await this.stockMovementService.create(createStockMovementDto);
        return new ApiResponseDto(
            201,
            stockMovement,
            'Stock movement created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a stock movement' })
    @ApiResponse({
        status: 200,
        description: 'Updated successfully',
        type: StockMovement,
    })
    async update(
        @Param('id') id: string,
        @Body() dto: CreateStockMovementDto,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.stockMovementService.update(id, dto);
        return new ApiResponseDto(
            200,
            updated,
            'Stock movement updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a stock movement' })
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.stockMovementService.remove(id);
        return new ApiResponseDto(200, null, 'Stock movement deleted successfully');
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'Get stock movements by product' })
    @ApiResponse({ status: 200, description: 'Return stock movements for the product' })
    async findByProduct(
        @Param('productId') productId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        return this.stockMovementService.findByProduct(productId, page, limit);
    }

    @Get('location/:locationId')
    @ApiOperation({ summary: 'Get stock movements by location' })
    @ApiResponse({ status: 200, description: 'Return stock movements for the location' })
    async findByLocation(
        @Param('locationId') locationId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        return this.stockMovementService.findByLocation(locationId, page, limit);
    }
} 