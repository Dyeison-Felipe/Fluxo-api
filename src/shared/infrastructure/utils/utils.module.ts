import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../envConfig/envConfig.module';
import { EncryptionImpl } from './encryption';
import { ENCRYPTION } from '../constants/moduleConstants';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: ENCRYPTION,
      useClass: EncryptionImpl,
    },
  ],
  exports: [ENCRYPTION],
})
export class UtilsModule {}
