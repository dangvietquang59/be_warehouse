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
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all customers' })
    @ApiResponse({ status: 200, description: 'Return all customers' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<[Customer[], number]> {
        return this.customerService.findAll(page, limit);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new customer' })
    @ApiResponse({
        status: 201,
        description: 'The customer has been successfully created.',
        type: Customer,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(
        @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<ApiResponseDto<any>> {
        const customer = await this.customerService.create(createCustomerDto);
        return new ApiResponseDto(
            201,
            customer,
            'Customer created successfully',
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a customer' })
    @ApiResponse({
        status: 200,
        description: 'Updated successfully',
        type: Customer,
    })
    async update(
        @Param('id') id: string,
        @Body() dto: CreateCustomerDto,
    ): Promise<ApiResponseDto<any>> {
        const updated = await this.customerService.update(id, dto);
        return new ApiResponseDto(
            200,
            updated,
            'Customer updated successfully',
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer' })
    @ApiResponse({ status: 200, description: 'Deleted successfully' })
    async remove(@Param('id') id: string): Promise<ApiResponseDto<any>> {
        await this.customerService.remove(id);
        return new ApiResponseDto(200, null, 'Customer deleted successfully');
    }
} 