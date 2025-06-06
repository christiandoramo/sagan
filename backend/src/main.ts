import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Env } from './infra/env';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';
import { ForbiddenException, Logger } from '@nestjs/common';

async function bootstrap() {
  const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:8000',
    'http://localhost:8080',
  ];

  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      origin: function (origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (
          whitelist.includes(origin) || // Checks your whitelist
          !!origin.match(/saganufrpe.tech$/) // Overall check for your domain
        ) {
          callback(null, true);
        } else {
          Logger.warn(`Origin: ${origin} not allowed by CORS`);
          callback(new ForbiddenException('Not allowed by CORS'), false);
        }
      },
      credentials: true,
    },
  });

  const configService: ConfigService<Env, true> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true });

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setTitle('Documentação - Sagan')
    .setDescription(
      'Documentação da API do projeto Sagan, desenvolvido para a disciplina de Engenharia de Software. Cada rota possui um exemplo de quais dados enviar na requisição e o que será devolvido resposta.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Documentação - Sagan',
    customfavIcon:
      'https://static-00.iconduck.com/assets.00/nestjs-icon-2048x2040-3rrvcej8.png',
  });

  app.use(cookieParser());

  await app.listen(port);
}
bootstrap();
