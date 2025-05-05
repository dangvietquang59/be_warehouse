import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[Supplier[], number]> {
        const [suppliers, total] = await this.supplierRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return [suppliers, total];
    }

    async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
        const supplier = this.supplierRepository.create(createSupplierDto);
        return this.supplierRepository.save(supplier);
    }

    async findOne(id: number): Promise<Supplier> {
        const role = await this.supplierRepository.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async update(
        id: number,
        updateSupplierDto: CreateSupplierDto,
    ): Promise<Supplier> {
        await this.supplierRepository.update(id, updateSupplierDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.supplierRepository.delete(id);
    }
}
