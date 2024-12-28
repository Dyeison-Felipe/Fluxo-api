import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigService } from './shared/infrastructure/envConfig/envConfig.service';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

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
}
