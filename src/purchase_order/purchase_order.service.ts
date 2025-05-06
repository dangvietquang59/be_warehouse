import { InjectRepository } from "@nestjs/typeorm";
import { PurchaseOrder } from "./purchase_order.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from "./dto/create-purchase_order.dto";
import { Between, FindOptionsWhere } from "typeorm";
import { FindPurchaseOrderDto } from "./dto/find-purchase-order.dto";
import { PurchaseOrderItem } from "./purchase_order_item.entity";

@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(PurchaseOrder)
        private purchaseOrderRepository: Repository<PurchaseOrder>,
        @InjectRepository(PurchaseOrderItem)
        private purchaseOrderItemRepository: Repository<PurchaseOrderItem>,
        private dataSource: DataSource
    ) {}

    async create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create purchase order
            const purchaseOrder = this.purchaseOrderRepository.create({
                ...createPurchaseOrderDto,
                created_at: new Date(),
                updated_at: new Date()
            });
            const savedPurchaseOrder = await queryRunner.manager.save(purchaseOrder);

            // Create purchase order items
            const items = createPurchaseOrderDto.items.map(item => 
                this.purchaseOrderItemRepository.create({
                    ...item,
                    purchase_order_id: savedPurchaseOrder.id
                })
            );
            await queryRunner.manager.save(items);

            await queryRunner.commitTransaction();
            return this.findOne(savedPurchaseOrder.id);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(findOptions: FindPurchaseOrderDto): Promise<{ data: PurchaseOrder[]; total: number; page: number; limit: number }> {
        const { page = 1, limit = 10, supplier_id, created_by, status, startDate, endDate } = findOptions;
        
        const where: FindOptionsWhere<PurchaseOrder> = {};
        
        if (supplier_id) {
            where.supplier_id = supplier_id;
        }
        
        if (created_by) {
            where.created_by = created_by;
        }
        
        if (status) {
            where.status = status;
        }
        
        if (startDate && endDate) {
            where.created_at = Between(startDate, endDate);
        }

        const [data, total] = await this.purchaseOrderRepository.findAndCount({
            where,
            relations: ['items', 'items.product', 'supplier', 'user'],
            select: {
                id: true,
                supplier_id: true,
                status: true,
                created_by: true,
                expected_delivery_date: true,
                created_at: true,
                updated_at: true,
                supplier: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    username: true
                },
                items: {
                    id: true,
                    purchase_order_id: true,
                    quantity: true,
                    product: {
                        id: true,
                        SKU: true,
                        name: true,
                        price: true,
                        unit: true,
                        description: true,
                        category_id: true
                    }
                }
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                created_at: 'DESC'
            }
        });

        return {
            data,
            total,
            page,
            limit
        };
    }

    async findOne(id: number): Promise<PurchaseOrder> {
        const purchaseOrder = await this.purchaseOrderRepository.findOne({ 
            where: { id },
            relations: ['items', 'items.product', 'supplier', 'user'],
            select: {
                id: true,
                supplier_id: true,
                status: true,
                created_by: true,
                expected_delivery_date: true,
                created_at: true,
                updated_at: true,
                supplier: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    username: true
                },
                items: {
                    id: true,
                    purchase_order_id: true,
                    quantity: true,
                    product: {
                        id: true,
                        SKU: true,
                        name: true,
                        price: true,
                        unit: true,
                        description: true,
                        category_id: true
                    }
                }
            }
        });
        if (!purchaseOrder) {
            throw new NotFoundException('Purchase order not found');
        }
        return purchaseOrder;
    }   
    
    async update(id: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const purchaseOrder = await this.findOne(id);
            
            // Update purchase order
            const updatedPurchaseOrder = await queryRunner.manager.save(PurchaseOrder, {
                ...purchaseOrder,
                ...updatePurchaseOrderDto,
                updated_at: new Date()
            });

            // Delete existing items
            await queryRunner.manager.delete(PurchaseOrderItem, { purchase_order_id: id });

            // Create new items
            const items = updatePurchaseOrderDto.items.map(item => 
                this.purchaseOrderItemRepository.create({
                    ...item,
                    purchase_order_id: id
                })
            );
            await queryRunner.manager.save(items);

            await queryRunner.commitTransaction();
            return this.findOne(id);
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async delete(id: number): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Delete items first due to foreign key constraint
            await queryRunner.manager.delete(PurchaseOrderItem, { purchase_order_id: id });
            // Then delete the purchase order
            await queryRunner.manager.delete(PurchaseOrder, id);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
