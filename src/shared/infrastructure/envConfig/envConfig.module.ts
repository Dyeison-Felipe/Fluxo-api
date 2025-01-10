import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './envConfig.service';
import { ENV_CONFIG_SERVICE } from '../constants/moduleConstants';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: ENV_CONFIG_SERVICE, useClass: EnvConfigService },
    EnvConfigService,
  ],
  exports: [EnvConfigService, ENV_CONFIG_SERVICE],
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
