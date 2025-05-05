import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationWarehouse } from './location.entity';
import { LocationWarehouseService } from './location.service';
import { LocationWarehouseController } from './location.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LocationWarehouse])],
    providers: [LocationWarehouseService],
    controllers: [LocationWarehouseController],
})
export class LocationWarehouseModule {}
