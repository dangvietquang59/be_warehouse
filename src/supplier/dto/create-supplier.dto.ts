import { IsString } from 'class-validator';

export class CreateSupplierDto {
    @IsString()
    name: string;

    @IsString()
    phone_number: string;

    @IsString()
    email: string;

    @IsString()
    address: string;
}

export class UpdateSupplierDto {
    @IsString()
    name: string;

    @IsString()
    phone_number: string;

    @IsString()
    email: string;

    @IsString()
    address: string;
}
