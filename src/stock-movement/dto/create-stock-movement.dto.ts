import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { MovementType, ReferenceType } from '../stock-movement.entity';

export class CreateStockMovementDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsOptional()
  @IsUUID()
  from_location_id?: string;

  @IsOptional()
  @IsUUID()
  to_location_id?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(MovementType)
  movement_type: MovementType;

  @IsNotEmpty()
  @IsEnum(ReferenceType)
  reference_type: ReferenceType;

  @IsNotEmpty()
  @IsString()
  reference_id: string;
} 