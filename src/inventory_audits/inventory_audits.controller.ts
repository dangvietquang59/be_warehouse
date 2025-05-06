import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InventoryAuditService } from "./inventory_audits.service";
import { Controller, Post, Body, Get, Put, Param, Delete, Query } from "@nestjs/common";
import { CreateInventoryAuditDto, UpdateInventoryAuditDto } from "./dto/create-inventory_audits.dto";
import { InventoryAudit } from "./inventory_audits.entity";
import { ApiResponseDto } from "../common/dto/api-response.dto";

@ApiTags('Inventory Audits')
@Controller('api/inventory-audits')
export class InventoryAuditsController {
    constructor(private readonly inventoryAuditService: InventoryAuditService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new inventory audit' })
    @ApiResponse({ status: 201, description: 'The inventory audit has been successfully created.', type: InventoryAudit })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async create(@Body() createInventoryAuditDto: CreateInventoryAuditDto): Promise<ApiResponseDto<any>> {
        const inventoryAudit = await this.inventoryAuditService.create(createInventoryAuditDto);
        return new ApiResponseDto(201, inventoryAudit, 'Inventory audit created successfully');
    }

    @Get()
    @ApiOperation({ summary: 'Get all inventory audits with pagination' })
    @ApiResponse({ status: 200, description: 'Return all inventory audits', type: InventoryAudit })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<ApiResponseDto<any>> {
        const [inventoryAudits, total] = await this.inventoryAuditService.findAll(page, limit);
        return new ApiResponseDto(200, inventoryAudits, 'Data retrieved successfully', page, limit, total);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an inventory audit by ID' })
    @ApiResponse({ status: 200, description: 'Return the inventory audit', type: InventoryAudit })
    @ApiResponse({ status: 404, description: 'Inventory audit not found' })
    async findOne(@Param('id') id: number): Promise<ApiResponseDto<any>> {
        const inventoryAudit = await this.inventoryAuditService.findOne(id);
        return new ApiResponseDto(200, inventoryAudit, 'Inventory audit retrieved successfully');
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an inventory audit by ID' })
    @ApiResponse({ status: 200, description: 'The inventory audit has been successfully updated.', type: InventoryAudit })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async update(
        @Param('id') id: number, 
        @Body() updateInventoryAuditDto: UpdateInventoryAuditDto
    ): Promise<ApiResponseDto<any>> {
        const inventoryAudit = await this.inventoryAuditService.update(id, updateInventoryAuditDto);
        return new ApiResponseDto(200, inventoryAudit, 'Inventory audit updated successfully');
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an inventory audit by ID' })
    @ApiResponse({ status: 200, description: 'The inventory audit has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Inventory audit not found' })
    async delete(@Param('id') id: number): Promise<ApiResponseDto<any>> {
        await this.inventoryAuditService.delete(id);
        return new ApiResponseDto(200, null, 'Inventory audit deleted successfully');
    }
}                                   
