import { IsString, IsInt, Min } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}

export class UpdateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}
