import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './product/product.entity';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
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
        entities: [Product, User, Role],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    UserModule,
    AuthModule,
    RoleModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
