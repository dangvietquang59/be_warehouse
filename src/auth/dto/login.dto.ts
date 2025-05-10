import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    account: string; // Can be username, email or card_number

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
