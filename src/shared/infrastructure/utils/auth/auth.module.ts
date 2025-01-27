import { Module } from '@nestjs/common';
import { JwtServiceModule } from '../jwtService/jwtNestjs.module';
import { Providers } from '../../constants/moduleConstants';
import { JwtService } from 'src/shared/application/utils/jwtService/jwtService';
import { EnvConfig } from '../../envConfig/envConfig.interface';
import { AuthServiceImpl } from './auth.service';

@Module({
  imports: [JwtServiceModule],
  providers: [
    {
      provide: Providers.AUTH_SERVICE,
      useFactory: (envConfigService: EnvConfig, jwtService: JwtService) => {
        return new AuthServiceImpl(envConfigService, jwtService);
      },
      inject: [Providers.ENV_CONFIG_SERVICE, Providers.JWT_SERVICE],
    },
  ],
  exports: [Providers.AUTH_SERVICE],
})
export class AuthModule {}
