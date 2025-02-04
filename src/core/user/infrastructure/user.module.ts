import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { UserRepository } from '../domain/repository/user.repository';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { EncryptionModule } from 'src/shared/infrastructure/utils/encryption/encryption.module';
import { UserSchema } from './user.schema';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { AuthModule } from 'src/shared/infrastructure/utils/auth/auth.module';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { AuthService } from 'src/shared/application/utils/auth/auth.service';
import { UserController } from './controller/user.controller';
import { UserRepositoryImpl } from './typeorm/repository/user.repository';
import { RoleRepository } from 'src/core/roles/domain/repositories/role.repository';
import { RoleModule } from 'src/core/roles/infrastructure/role.module';
import { RefreshTokenUseCase } from '../application/usecase/refreshToken.usecase';
import { LoggedUserService } from 'src/shared/application/utils/loggedUser/loggedUser';
import { LoggedUserUseCase } from '../application/usecase/loggedUser.usecase';
import { LoggedUserModule } from 'src/shared/infrastructure/utils/loggedUser/loggedUser.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceModule } from 'src/shared/infrastructure/utils/jwtService/jwtNestjs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    EncryptionModule,
    AuthModule,
    RoleModule,
    LoggedUserModule,
    JwtServiceModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    {
      provide: Providers.USER_REPOSITORY_IMPL,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (user: UserRepository, encryption: Encryption, roleRepository: RoleRepository) => {
        return new CreateUserUseCase(user, encryption, roleRepository);
      },
      inject: [Providers.USER_REPOSITORY_IMPL, Providers.ENCRYPTION, Providers.ROLE_REPOSITORY],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (user: UserRepository) => {
        return new UpdateUserUseCase(user);
      },
      inject: [Providers.USER_REPOSITORY_IMPL],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        userRepository: UserRepository,
        encryption: Encryption,
        authService: AuthService,
      ) => {
        return new LoginUseCase(userRepository, encryption, authService);
      },
      inject: [
        Providers.USER_REPOSITORY_IMPL,
        Providers.ENCRYPTION,
        Providers.AUTH_SERVICE,
      ],
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (authService: AuthService, loggedUser: LoggedUserService) => {
        return new RefreshTokenUseCase(authService, loggedUser)
      },
      inject: [Providers.AUTH_SERVICE, Providers.LOGGED_USER_SERVICE],
    },
    {
      provide: LoggedUserUseCase,
      useFactory: (authService: AuthService) => {
        return new LoggedUserUseCase(authService);
      },
      inject: [Providers.AUTH_SERVICE],
    },
  ],
  exports: [Providers.USER_REPOSITORY_IMPL],
})
export class UserModule { }
