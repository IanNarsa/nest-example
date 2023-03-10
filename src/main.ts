import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Warranty System')
    .setDescription('Warranty API description')
    .setVersion('1.0')
    .addTag('warranty')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
