import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (optional but recommended for frontend/backend separation)
  app.enableCors();

  // Apply global validation pipe (enables DTO validation)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra properties exist
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  // Start server on given port or fallback to 3000
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();

