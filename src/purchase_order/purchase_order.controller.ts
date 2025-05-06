import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PurchaseOrderService } from "./purchase_order.service";
import { Controller, Post, Body, Get, Query, Param, Put, Delete } from "@nestjs/common";
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from "./dto/create-purchase_order.dto";
import { FindPurchaseOrderDto } from "./dto/find-purchase-order.dto";

@ApiTags('Purchase Orders')
@Controller('/api/purchase-orders')
export class PurchaseOrderController {
    constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

   

    @Get()
    @ApiOperation({ summary: 'Get all purchase orders' })
    @ApiResponse({ status: 200, description: 'Return all purchase orders' })
    async findAll(@Query() findPurchaseOrderDto: FindPurchaseOrderDto) {
        return this.purchaseOrderService.findAll(findPurchaseOrderDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a purchase order by ID' })
    @ApiResponse({ status: 200, description: 'Return the purchase order' })
    async findOne(@Param('id') id: number) {
        return this.purchaseOrderService.findOne(id);
    }
    
    @Post()
    @ApiOperation({ summary: 'Create a new purchase order' })
    @ApiResponse({ status: 201, description: 'The purchase order has been successfully created.' })
    @ApiBody({ type: CreatePurchaseOrderDto })
    async create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
        return this.purchaseOrderService.create(createPurchaseOrderDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a purchase order by ID' })
    @ApiResponse({ status: 200, description: 'The purchase order has been successfully updated.' })
    @ApiBody({ type: UpdatePurchaseOrderDto })
    async update(@Param('id') id: number, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
        return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a purchase order by ID' })
    @ApiResponse({ status: 200, description: 'The purchase order has been successfully deleted.' })
    async delete(@Param('id') id: number) {
        return this.purchaseOrderService.delete(id);
    }
}

