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
import { SalesOrderService } from './sales-order.service';
import { SalesOrder } from './sales-order.entity';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { SalesOrderStatus } from './sales-order.entity';

@ApiTags('Sales Orders')
@Controller('api/sales-orders')
export class SalesOrderController {
    constructor(private readonly salesOrderService: SalesOrderService) {}

    @Get()
    @ApiOperation({ summary: 'Get all sales orders' })
    @ApiResponse({ status: 200, description: 'Return all sales orders' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[SalesOrder[], number]> {
        return this.salesOrderService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new sales order' })
    @ApiResponse({
        status: 201,
        description: 'The sales order has been successfully created.',
        type: SalesOrder,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createSalesOrderDto: CreateSalesOrderDto,
    ): Promise<ApiResponseDto<any>> {
        const salesOrder = await this.salesOrderService.create(createSalesOrderDto);
        return new ApiResponseDto(
            201,
            salesOrder,
            'Sales order created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a sales order' })
    @ApiResponse({
        status: 200,
        description: 'Updated successfully',
        type: SalesOrder,
    })
    async update(
        @Param('id') id: string,
        @Body() dto: CreateSalesOrderDto,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.salesOrderService.update(id, dto);
        return new ApiResponseDto(
            200,
            updated,
            'Sales order updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a sales order' })
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.salesOrderService.remove(id);
        return new ApiResponseDto(200, null, 'Sales order deleted successfully');
    }

    @Put(':id/status')
    @ApiOperation({ summary: 'Update sales order status' })
    @ApiResponse({
        status: 200,
        description: 'Status updated successfully',
        type: SalesOrder,
    })
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: SalesOrderStatus,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.salesOrderService.updateStatus(id, status);
        return new ApiResponseDto(
            200,
            updated,
            'Sales order status updated successfully',
        );
    }
} 