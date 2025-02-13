import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CnpjServiceImpl } from './cnpj.service';
import { Providers } from '../../constants/moduleConstants';
import { CnpjController } from './cnpj.controller';

@Module({
  imports: [HttpModule],
  controllers: [CnpjController],
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