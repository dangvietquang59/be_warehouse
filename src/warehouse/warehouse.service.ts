import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWareHouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[Warehouse[], number]> {
        const [warehouses, total] = await this.warehouseRepository.findAndCount(
            {
                skip: (page - 1) * limit,
                take: limit,
            },
        );
        return [warehouses, total];
    }

    async create(createWarehouseDto: CreateWareHouseDto): Promise<Warehouse> {
        const warehouse = this.warehouseRepository.create(createWarehouseDto);
        return this.warehouseRepository.save(warehouse);
    }

    async findOne(id: number): Promise<Warehouse> {
        const role = await this.warehouseRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async update(
        id: number,
        updateWarehouseDto: CreateWareHouseDto,
    ): Promise<Warehouse> {
        await this.warehouseRepository.update(id, updateWarehouseDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.warehouseRepository.delete(id);
    }
}
