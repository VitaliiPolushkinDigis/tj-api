import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-HTTP-Method-Override,Observe,X-Forwarded-for',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7777, () =>
    console.log('_______App is running on http://localhost:7777'),
  );
}
bootstrap();
