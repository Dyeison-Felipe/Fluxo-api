import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../envConfig/envConfig.module';
import { EncryptionImpl } from './encryption';
import { ENCRYPTION, ENV_CONFIG_SERVICE } from '../constants/moduleConstants';
import { EnvConfig } from '../envConfig/envConfig.interface';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: ENCRYPTION,
      useClass: EncryptionImpl,
    },
    {
      provide: ENCRYPTION,
      useFactory: (envConfig: EnvConfig) => {
        return new EncryptionImpl(envConfig);
      },
      inject: [ENV_CONFIG_SERVICE],
    },
  ],
  exports: [ENCRYPTION],
})
export class UtilsModule {}
