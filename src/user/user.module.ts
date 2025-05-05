import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM Module
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Kết nối User Entity với TypeORM
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
