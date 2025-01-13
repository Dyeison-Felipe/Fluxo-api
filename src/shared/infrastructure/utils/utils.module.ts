import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../envConfig/envConfig.module';
import { EncryptionImpl } from './encryption';
import { EnvConfig } from '../envConfig/envConfig.interface';
import { Providers } from '../constants/moduleConstants';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: Providers.ENCRYPTION,
      useClass: EncryptionImpl,
    },
    {
      provide: Providers.ENCRYPTION,
      useFactory: (envConfig: EnvConfig) => {
        return new EncryptionImpl(envConfig);
      },
      inject: [Providers.ENV_CONFIG_SERVICE],
    },
  ],
  exports: [Providers.ENCRYPTION],
})
export class UtilsModule {}
