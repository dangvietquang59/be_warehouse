import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@Public()
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(201)
    async register(
        @Body() registerDto: RegisterDto,
    ): Promise<ApiResponseDto<any>> {
        const user = await this.authService.register(registerDto);
        return new ApiResponseDto(
            201,
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role_id: user.role_id,
            },
            'User registered successfully',
        );
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ApiResponseDto<any>> {
        const result = await this.authService.login(loginDto);
        return new ApiResponseDto(200, result, 'Login successful');
    }
}
