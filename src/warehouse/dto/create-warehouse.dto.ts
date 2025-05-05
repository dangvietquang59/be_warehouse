import { IsString } from 'class-validator';

export class CreateWareHouseDto {
    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    manager_name: string;
}

export class UpdateWareHouseDto {
    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    manager_name: string;
}
