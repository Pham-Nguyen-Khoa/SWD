import './configs/pg-type-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from "./configs/swagger.config"
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { types } from 'pg';
// import { NoLogHttpExceptionFilter } from './configs/no-log-http-exception.filter';
// import * as dotenv from 'dotenv';
// import * as bodyParser from 'body-parser';
// dotenv.config();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Cấu hình validate
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.useGlobalFilters(new NoLogHttpExceptionFilter());

  // Tăng giới hạn kích thước payload
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: false
  });

  // Setup Swagger
  setupSwagger(app);


  // Start prooject
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
