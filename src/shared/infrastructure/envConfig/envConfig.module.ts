import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './envConfig.service';
import { Providers } from '../constants/moduleConstants';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: Providers.ENV_CONFIG_SERVICE, useClass: EnvConfigService },
    EnvConfigService,
  ],
  exports: [Providers.ENV_CONFIG_SERVICE],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    return super.forRoot({
      isGlobal: true,
      ...options,
      envFilePath: [join(__dirname, `../../../../.env`)],
    });
  }
}
