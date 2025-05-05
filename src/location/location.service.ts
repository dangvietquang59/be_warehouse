import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationWarehouse } from './location.entity';
import { CreateLocationWarehouseDto } from './dto/create-location.dto';

@Injectable()
export class LocationWarehouseService {
    constructor(
        @InjectRepository(LocationWarehouse)
        private readonly locationWarehouseRepository: Repository<LocationWarehouse>,
    ) {}

    async findAll(
        page: number = 1,
        limit: number = 10,
    ): Promise<[LocationWarehouse[], number]> {
        const [locationWarehouses, total] =
            await this.locationWarehouseRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
        return [locationWarehouses, total];
    }

    async create(
        createLocationWarehouseDto: CreateLocationWarehouseDto,
    ): Promise<LocationWarehouse> {
        const locationWarehouse = this.locationWarehouseRepository.create(
            createLocationWarehouseDto,
        );
        return this.locationWarehouseRepository.save(locationWarehouse);
    }

    async update(
        id: number,
        dto: CreateLocationWarehouseDto,
    ): Promise<LocationWarehouse> {
        const location = await this.locationWarehouseRepository.findOne({
            where: { id },
        });
        if (!location) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }

        await this.locationWarehouseRepository.update(id, dto);
        const updatedLocation = await this.locationWarehouseRepository.findOne({
            where: { id },
        });
        if (!updatedLocation) {
            throw new NotFoundException(
                `Location with id ${id} not found after update`,
            );
        }
        return updatedLocation;
    }

    async remove(id: number): Promise<void> {
        const location = await this.locationWarehouseRepository.findOne({
            where: { id },
        });
        if (!location) {
            throw new NotFoundException(`Location with id ${id} not found`);
        }

        await this.locationWarehouseRepository.delete(id);
    }
}
