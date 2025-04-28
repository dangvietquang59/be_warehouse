import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Đảm bảo đã cài @nestjs/config
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    // Đảm bảo ConfigModule được khởi tạo và đọc file .env
    ConfigModule.forRoot({
      envFilePath: '.env', // Đọc từ file .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Product], // Danh sách entities
        synchronize: true, // Cài đặt cho development
      }),
      inject: [ConfigService],
    }),
    ProductModule, // Đăng ký các module khác
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
