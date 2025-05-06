import { IsOptional, IsInt, IsString, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPurchaseOrderDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    supplier_id?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    created_by?: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
} 