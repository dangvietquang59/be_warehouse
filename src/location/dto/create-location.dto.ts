import { IsString, IsInt } from 'class-validator';

export class CreateLocationWarehouseDto {
    @IsString()
    name: string;

    @IsInt()
    warehouse_id: number;

    @IsString()
    code: string;

    @IsString()
    description: string;
}

export class UpdateLocationWarehouseDto {
    @IsString()
    name: string;

    @IsInt()
    warehouse_id: number;

    @IsString()
    code: string;

    @IsString()
    description: string;
}
