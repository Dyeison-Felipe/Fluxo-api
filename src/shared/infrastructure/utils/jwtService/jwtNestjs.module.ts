import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Providers } from '../../constants/moduleConstants';
import { JwtServiceImpl } from './jwtNestjs.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
      }),
    }),
  ],
  providers: [
    {
      provide: Providers.JWT_SERVICE,
      useFactory: (jwtService: JwtService) => {
        return new JwtServiceImpl(jwtService);
      },
      inject: [JwtService],
    },
  ],
  exports: [Providers.JWT_SERVICE],
})
export class JwtServiceModule {}
