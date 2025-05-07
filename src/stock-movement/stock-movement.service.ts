import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './stock-movement.entity';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';

@Injectable()
export class StockMovementService {
    constructor(
        @InjectRepository(StockMovement)
        private readonly stockMovementRepository: Repository<StockMovement>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        const [stockMovements, total] = await this.stockMovementRepository.findAndCount({
            relations: ['product', 'fromLocation', 'toLocation'],
            skip: (page - 1) * limit,
            take: limit,
        });
        return [stockMovements, total];
    }

    async create(createStockMovementDto: CreateStockMovementDto): Promise<StockMovement> {
        const stockMovement = this.stockMovementRepository.create(createStockMovementDto);
        return this.stockMovementRepository.save(stockMovement);
    }

    async update(id: string, dto: CreateStockMovementDto): Promise<StockMovement> {
        const stockMovement = await this.stockMovementRepository.findOne({
            where: { id },
            relations: ['product', 'fromLocation', 'toLocation'],
        });
        if (!stockMovement) {
            throw new NotFoundException(`Stock movement with id ${id} not found`);
        }
        await this.stockMovementRepository.update(id, dto);
        const updatedStockMovement = await this.stockMovementRepository.findOne({
            where: { id },
            relations: ['product', 'fromLocation', 'toLocation'],
        });
        if (!updatedStockMovement) {
            throw new NotFoundException(
                `Stock movement with id ${id} not found after update`,
            );
        }
        return updatedStockMovement;
    }

    async remove(id: string): Promise<void> {
        const stockMovement = await this.stockMovementRepository.findOne({
            where: { id },
        });
        if (!stockMovement) {
            throw new NotFoundException(`Stock movement with id ${id} not found`);
        }

        await this.stockMovementRepository.delete(id);
    }

    async findByProduct(
        productId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        const [stockMovements, total] = await this.stockMovementRepository.findAndCount({
            where: { product_id: productId },
            relations: ['product', 'fromLocation', 'toLocation'],
            skip: (page - 1) * limit,
            take: limit,
        });
        return [stockMovements, total];
    }

    async findByLocation(
        locationId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<[StockMovement[], number]> {
        const [stockMovements, total] = await this.stockMovementRepository.findAndCount({
            where: [
                { from_location_id: locationId },
                { to_location_id: locationId },
            ],
            relations: ['product', 'fromLocation', 'toLocation'],
            skip: (page - 1) * limit,
            take: limit,
        });
        return [stockMovements, total];
    }
} 