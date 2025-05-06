import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InventoryAudit } from "./inventory_audits.entity";
import { CreateInventoryAuditDto, UpdateInventoryAuditDto } from "./dto/create-inventory_audits.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InventoryAuditService {
    constructor(
        @InjectRepository(InventoryAudit)
        private inventoryAuditRepository: Repository<InventoryAudit>,
    ) {}

    async create(createInventoryAuditDto: CreateInventoryAuditDto): Promise<InventoryAudit> {
        const inventoryAudit = this.inventoryAuditRepository.create(createInventoryAuditDto as unknown as InventoryAudit);
        return this.inventoryAuditRepository.save(inventoryAudit);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<[InventoryAudit[], number]> {
        const [inventoryAudits, total] = await this.inventoryAuditRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: 'DESC'
            }
        });
        return [inventoryAudits, total];
    }

    async findOne(id: number): Promise<InventoryAudit> {
        const inventoryAudit = await this.inventoryAuditRepository.findOne({ where: { id } });
        if (!inventoryAudit) {
            throw new NotFoundException('Inventory audit not found');
        }
        return inventoryAudit;  
    }

    async update(id: number, updateInventoryAuditDto: UpdateInventoryAuditDto): Promise<InventoryAudit> {
        await this.inventoryAuditRepository.update(id, updateInventoryAuditDto as unknown as InventoryAudit);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.inventoryAuditRepository.delete(id);
    }
}