import { IsString, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  price: number;
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsInt()
  @Min(1)
  price?: number;
}
