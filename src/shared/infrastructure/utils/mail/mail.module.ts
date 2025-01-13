import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EnvConfig } from '../../envConfig/envConfig.interface';
import { Providers } from '../../constants/moduleConstants';
import { MailServiceImpl } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (envConfig: EnvConfig) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: envConfig.getUserEmailApplication(),
            pass: envConfig.getUserPasswordApplication(),
          },
        },
      }),
      inject: [Providers.ENV_CONFIG_SERVICE],
    }),
  ],
  providers: [
    {
      provide: Providers.MAIL_SERVICE,
      useFactory: (mailerService: MailerService) => {
        return new MailServiceImpl(mailerService);
      },
      inject: [MailerService],
    },
  ],
  exports: [Providers.MAIL_SERVICE],
})
export class MailServiceModule {}
