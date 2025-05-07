import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { SalesOrderStatus } from '../sales-order.entity';

class CreateSalesOrderItemDto {
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateSalesOrderDto {
  @IsNotEmpty()
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