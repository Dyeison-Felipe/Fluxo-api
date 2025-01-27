import { Module } from '@nestjs/common';
import { Providers } from '../../constants/moduleConstants';
import { LoggedUserNestjsService } from './loggedUser';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: Providers.LOGGED_USER_SERVICE,
      useClass: LoggedUserNestjsService,
    },
  ],
  exports: [Providers.LOGGED_USER_SERVICE],
})
export class LoggedUserModule {}
