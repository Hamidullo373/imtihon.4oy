import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.enableCors({
    allowedHeaders: ['authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    // .setTitle('Review Guards and File Upload')
    .setDescription('The review API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  if ((process.env.NODE_ENV || '').trim() === 'development') {
    SwaggerModule.setup('docs', app, documentFactory);
  }

  const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
  await app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
}
bootstrap();
