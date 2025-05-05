import { Injectable } from '@nestjs/common';
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
    const [locationWarehouses, total] = await this.locationWarehouseRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [locationWarehouses, total];
  }

  async create(createLocationWarehouseDto: CreateLocationWarehouseDto): Promise<LocationWarehouse> {
    const locationWarehouse = this.locationWarehouseRepository.create(createLocationWarehouseDto);
    return this.locationWarehouseRepository.save(locationWarehouse);
  }
}
