import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityLogDto {
  @ApiProperty({ description: 'User ID who performed the action' })
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty({ description: 'Action performed' })
  @IsNotEmpty()
  @IsString()
  action: string;

  @ApiProperty({ description: 'Name of the table affected' })
  @IsNotEmpty()
  @IsString()
  table_name: string;

  @ApiProperty({ description: 'ID of the record affected' })
  @IsNotEmpty()
  @IsString()
  record_id: string;
} 