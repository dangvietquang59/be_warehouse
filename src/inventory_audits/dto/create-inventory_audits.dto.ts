import { IsString, IsInt } from 'class-validator';

export class CreateInventoryAuditDto {
    @IsInt()
    warehouse_id: number;

    @IsInt()
    product_id: number;

    @IsInt()
    expected_qty: number;

    @IsInt()
    actual_qty: number;

    @IsString()
    note: string;
}

export class UpdateInventoryAuditDto {
    @IsInt()
    warehouse_id: number;

    @IsInt()
    product_id: number;

    @IsInt()
    expected_qty: number;

    @IsInt()
    actual_qty: number;

    @IsString()
    note: string;
}
