import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS (important for frontend integration)
    app.enableCors({
      origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    });


  // ✅ Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Swagger Configuration (Optimized for Render)
  const config = new DocumentBuilder()
    .setTitle('SoilXpert API')
    .setDescription('API documentation for the SoilXpert app')
    .setVersion('1.0')
    .addTag('SHC')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'SoilXpert API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
    },
  });

  // ✅ Start Server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0'); // important for Render

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/api-docs`);
}

bootstrap();



