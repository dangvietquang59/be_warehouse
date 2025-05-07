import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrder, SalesOrderStatus } from './sales-order.entity';
import { SalesOrderItem } from './sales-order-item.entity';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { CustomerService } from '../customer/customer.service';
import { ProductService } from '../product/product.service';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@Injectable()
export class SalesOrderService {
  constructor(
    @InjectRepository(SalesOrder)
    private readonly salesOrderRepository: Repository<SalesOrder>,
    @InjectRepository(SalesOrderItem)
    private salesOrderItemRepository: Repository<SalesOrderItem>,
    private customerService: CustomerService,
    private productService: ProductService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[SalesOrder[], number]> {
    const [salesOrders, total] = await this.salesOrderRepository.findAndCount({
      relations: ['customer', 'items', 'items.product'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return [salesOrders, total];
  }

  async create(createSalesOrderDto: CreateSalesOrderDto): Promise<SalesOrder> {
    const { items, ...orderData } = createSalesOrderDto;

    // Verify customer exists
    await this.customerService.findOne(orderData.customer_id);

    // Verify all products exist
    for (const item of items) {
      await this.productService.findOne(Number(item.product_id));
    }

    const salesOrder = this.salesOrderRepository.create(orderData);
    const savedOrder = await this.salesOrderRepository.save(salesOrder);

    // Create order items
    const orderItems = items.map(item =>
      this.salesOrderItemRepository.create({
        ...item,
        sales_order_id: savedOrder.id,
      }),
    );
    await this.salesOrderItemRepository.save(orderItems);

    return this.findOne(savedOrder.id);
  }

  findOne(id: string): Promise<SalesOrder> {
    return this.salesOrderRepository.findOneOrFail({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
  }

  async update(id: string, dto: CreateSalesOrderDto): Promise<SalesOrder> {
    const salesOrder = await this.salesOrderRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
    if (!salesOrder) {
      throw new NotFoundException(`Sales order with id ${id} not found`);
    }
    await this.salesOrderRepository.update(id, dto);
    const updatedSalesOrder = await this.salesOrderRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
    if (!updatedSalesOrder) {
      throw new NotFoundException(
        `Sales order with id ${id} not found after update`,
      );
    }
    return updatedSalesOrder;
  }

  async remove(id: string): Promise<void> {
    const salesOrder = await this.salesOrderRepository.findOne({
      where: { id },
    });
    if (!salesOrder) {
      throw new NotFoundException(`Sales order with id ${id} not found`);
    }

    await this.salesOrderRepository.delete(id);
  }

  async updateStatus(id: string, status: SalesOrderStatus): Promise<SalesOrder> {
    const salesOrder = await this.salesOrderRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
    if (!salesOrder) {
      throw new NotFoundException(`Sales order with id ${id} not found`);
    }

    await this.salesOrderRepository.update(id, { status });
    const updatedSalesOrder = await this.salesOrderRepository.findOne({
      where: { id },
      relations: ['customer', 'items', 'items.product'],
    });
    if (!updatedSalesOrder) {
      throw new NotFoundException(
        `Sales order with id ${id} not found after status update`,
      );
    }
    return updatedSalesOrder;
  }
} 