import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CnpjServiceImpl } from './cnpj.service';
import { Providers } from '../../constants/moduleConstants';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    {
      provide: Providers.CNPJ_SERVICE,
      useFactory: (httpService: HttpService) => {
        return new CnpjServiceImpl(httpService);
      },
      inject: [HttpService],
    },
  ],
  exports: [Providers.CNPJ_SERVICE]
})
export class CnpjModule { }