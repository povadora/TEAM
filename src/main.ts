import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Enable CORS for all routes
  await app.listen(3001);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     enableImplicitConversion: false,
  //   }),
  // );
}
bootstrap();
