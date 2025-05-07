import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Customer contact information', type: 'object' })
  @IsNotEmpty()
  @IsObject()
  contact_info: Record<string, any>;

  @ApiProperty({ description: 'Customer address' })
  @IsNotEmpty()
  @IsString()
  address: string;
} 