import { IsString, IsInt, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsInt()
    @Min(1)
    price: number;

    @IsString()
    description: string;

    @IsString()
    unit: string;

    @IsInt()
    category_id: number;
}

export class UpdateProductDto {
    @IsString()
    name: string;

    @IsInt()
    @Min(1)
    price: number;

    @IsString()
    description: string;

    @IsString()
    unit: string;

    @IsInt()
    category_id: number;
}
