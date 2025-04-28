import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Swagger
  const options = new DocumentBuilder()
    .setTitle('Warehouse Management API')
    .setDescription('The warehouse management API description')
    .setVersion('1.0')
    .addTag('warehouse')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // Swagger sẽ có sẵn tại /api
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

bootstrap();
