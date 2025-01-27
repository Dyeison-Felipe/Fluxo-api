import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfigService } from './shared/infrastructure/envConfig/envConfig.service';
import { applyGlobalConfig } from './globalConfig';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envConfigService = app.get(EnvConfigService);

  await applyGlobalConfig(app, envConfigService);

  await app.listen(envConfigService.getPort(), '0.0.0.0');
}
bootstrap();
