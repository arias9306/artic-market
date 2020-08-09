import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const options = new DocumentBuilder()
    .setTitle('Artic Marker API')
    .setDescription('Easy Marker API')
    .setVersion('0.1')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
