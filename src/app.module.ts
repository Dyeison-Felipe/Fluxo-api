import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/envConfig/envConfig.module';
import { CompanyModule } from './core/company/infrastructure/company.module';
import { AddressModule } from './core/address/infrastructure/address.module';
import { OwnerTypeModule } from './core/ownerType/infrastructure/ownerType.module';
import { UserModule } from './core/user/infrastructure/user.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    CompanyModule,
    AddressModule,
    OwnerTypeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
