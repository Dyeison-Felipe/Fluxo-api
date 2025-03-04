import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigService } from './shared/infrastructure/envConfig/envConfig.service';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResourceNotFoundErrorFilter } from './shared/infrastructure/exeptionsFilter/resourceNotFoundFilter';
import { ValidationPipe } from '@nestjs/common';
import { ConflictErrorFilter } from './shared/infrastructure/exeptionsFilter/conflictExeprionErrorFilter';
import { UnauthorizedExceptionErrorFilter } from './shared/infrastructure/exeptionsFilter/unauthorizedExceptionErrorFilter';
import { InvalidTokenErrorFilter } from './shared/infrastructure/exeptionsFilter/InvalidTokenErrorFilter';
import fastifyCookie from '@fastify/cookie';

export async function applyGlobalConfig(
  app: NestFastifyApplication,
  envConfigService: EnvConfigService,
) {
  // Swagger configs
  if (envConfigService.getNodeEnv() === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Fluxo')
      .setDescription('Gerenciamento de fluxo de caixa')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Informar o JWT para autorizar o acesso',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Pipes Config
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  // Cookies config
  await app.register(fastifyCookie as any, {
    secret: envConfigService.getCookiesSecret(),
  });

  // Config Cors
  app.enableCors({
    origin: envConfigService.getOrigin(),
    methods: envConfigService.getMethods(),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // Error Filters Config
  app.useGlobalFilters(
    new ResourceNotFoundErrorFilter(),
    new ConflictErrorFilter(),
    new UnauthorizedExceptionErrorFilter(),
    new InvalidTokenErrorFilter(),
  );
}
