import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { SalesOrderStatus } from '../sales-order.entity';

class CreateSalesOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateSalesOrderDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id: string;

  @IsNotEmpty()
  @IsEnum(SalesOrderStatus)
  status: SalesOrderStatus;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  delivery_date: Date;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesOrderItemDto)
  items: CreateSalesOrderItemDto[];
} 