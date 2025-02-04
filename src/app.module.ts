import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { EnvConfigModule } from './shared/infrastructure/envConfig/envConfig.module';
import { CompanyModule } from './core/company/infrastructure/company.module';
import { AddressModule } from './core/address/infrastructure/address.module';
import { OwnerTypeModule } from './core/ownerType/infrastructure/ownerType.module';
import { UserModule } from './core/user/infrastructure/user.module';
import { LoggedUserModule } from './shared/infrastructure/utils/loggedUser/loggedUser.module';
import { JwtServiceModule } from './shared/infrastructure/utils/jwtService/jwtNestjs.module';
import { EncryptionModule } from './shared/infrastructure/utils/encryption/encryption.module';
import { AuthModule } from './shared/infrastructure/utils/auth/auth.module';
import { MailServiceModule } from './shared/infrastructure/utils/mail/mail.module';
import { RoleModule } from './core/roles/infrastructure/role.module';
import { PageModule } from './core/pages/infrastructure/pages.module';
import { RolesPagesModule } from './core/rolesPages/infrastructure/rolesPages.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    CompanyModule,
    AddressModule,
    OwnerTypeModule,
    UserModule,
    LoggedUserModule,
    JwtServiceModule,
    EncryptionModule,
    AuthModule,
    MailServiceModule,
    RoleModule,
    PageModule,
    RolesPagesModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
