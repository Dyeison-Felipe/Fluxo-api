import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';
import { EnvConfigService } from './envConfig.service';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: 'EnvConfig', useClass: EnvConfigService },
    EnvConfigService,
  ],
  exports: [EnvConfigService, 'EnvConfig'],
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
