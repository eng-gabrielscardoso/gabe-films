import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const secrets = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(secrets.get('APP_NAME'))
    .setDescription(secrets.get('APP_DESCRIPTION'))
    .setLicense(
      'MIT',
      'https://github.com/eng-gabrielscardoso/gabe-films/blob/main/LICENSE',
    )
    .setVersion(secrets.get('APP_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const port = secrets.get('APP_PORT') || 3000;

  SwaggerModule.setup('docs', app, document);

  await app.enableCors();
  await app.listen(port);
}
bootstrap();
