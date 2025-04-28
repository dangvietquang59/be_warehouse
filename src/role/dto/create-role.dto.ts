import { IsString,  } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class UpdateRoleDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
