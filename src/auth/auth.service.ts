import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BusinessException } from '../common/exceptions/business.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        throw new BusinessException('Email already exists');
      }

      return this.userService.createUser(registerDto);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      // Join bảng Role để có user.role.name
      const user = await this.userService.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // JWT payload gồm username, user id, và tên vai trò
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role?.name || 'USER', // fallback nếu role null
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Login failed:', error); // Ghi log hỗ trợ debug
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BusinessException('Failed to login');
    }
  }
}
