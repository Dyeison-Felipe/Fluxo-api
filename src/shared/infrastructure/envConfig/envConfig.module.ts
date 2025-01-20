import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './envConfig.service';
import { Providers } from '../constants/moduleConstants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    EnvConfigService,
    {
      provide: Providers.ENV_CONFIG_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new EnvConfigService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [Providers.ENV_CONFIG_SERVICE],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    return ConfigModule.forRoot({
      isGlobal: true,
      ...options,
      envFilePath: [join(__dirname, `../../../../.env${process.env.NODE_ENV}`)],
    });
  }
}
