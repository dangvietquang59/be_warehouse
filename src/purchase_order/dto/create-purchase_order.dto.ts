import { IsString, IsInt, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseOrderItemDto } from './create-purchase-order-item.dto';

export class CreatePurchaseOrderDto {
    @IsInt()
    supplier_id: number;

    @IsString()
    status: string;

    @IsInt()
    created_by: number;

    @IsDate()
    @Type(() => Date)
    expected_delivery_date: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseOrderItemDto)
    items: CreatePurchaseOrderItemDto[];
}

export class UpdatePurchaseOrderDto {
    @IsInt()
    supplier_id: number;

    @IsString()
    status: string;

    @IsInt()
    created_by: number;

    @IsDate()
    @Type(() => Date)
    expected_delivery_date: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePurchaseOrderItemDto)
    items: CreatePurchaseOrderItemDto[];
}
