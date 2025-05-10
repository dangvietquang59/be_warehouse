import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // Đăng ký người dùng mới
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const hashedPassword = await hash(createUserDto.password, 10);
    
            // Bước 1: tạo user chưa có card_number
            const newUser = this.userRepository.create({
                username: createUserDto.username,
                password: hashedPassword,
                email: createUserDto.email,
                role_id: 3,
            });
    
            // Bước 2: lưu user để có ID
            const savedUser = await this.userRepository.save(newUser);
    
            // Bước 3: tạo card_number: YYMM + ID (dạng chuỗi có padding nếu cần)
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2); // 2 số cuối năm
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 2 số tháng
            const idStr = savedUser.id.toString().padStart(4, '0'); // 4 số ID padded (ví dụ 0001)
    
            const cardNumber = `${year}${month}${idStr}`;
    
            // Bước 4: cập nhật lại card_number
            savedUser.card_number = cardNumber;
            return await this.userRepository.save(savedUser);
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }
    

    // Tìm người dùng theo tên đăng nhập
    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findByCardNumber(card_number: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { card_number } });
    }

    // Tìm người dùng theo email
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { email },
            relations: ['role'],
        });
    }

    // Tìm người dùng theo ID
    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

   async findAll(page: number = 1, limit: number = 10): Promise<[User[], number]> {
    const [users, total] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        select: ["id", "username", "email", "role_id"], 
    });
    return [users, total];
}

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: parseInt(id) },
            });
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            if (updateUserDto.password) {
                updateUserDto.password = await hash(updateUserDto.password, 10);
            }

            Object.assign(user, updateUserDto);
            return await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to update user');
        }
    }

    async findByAccount(account: string): Promise<User | null> {
        // Try to find by username
        let user = await this.userRepository.findOne({ 
            where: { username: account },
            relations: ['role']
        });
        if (user) return user;

        // Try to find by email
        user = await this.userRepository.findOne({ 
            where: { email: account },
            relations: ['role']
        });
        if (user) return user;

        // Try to find by card_number
        user = await this.userRepository.findOne({ 
            where: { card_number: account },
            relations: ['role']
        });
        return user;
    }
}
