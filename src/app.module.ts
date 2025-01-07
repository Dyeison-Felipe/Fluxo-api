import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/envConfig/envConfig.module';
import { CompanyModule } from './core/company/infrastructure/company.module';
import { AddressModule } from './core/address/infrastructure/address.module';
import { OwnerAddressModule } from './core/owner-address/infrastructure/ownerAddress.module';
import { UserModule } from './core/user/infrastructure/user.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    CompanyModule,
    AddressModule,
    OwnerAddressModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
