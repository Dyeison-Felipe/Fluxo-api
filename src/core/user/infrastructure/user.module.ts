import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { UserRepositoryImpl } from './user.repository';
import { UserRepository } from '../domain/user.interface';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { EncryptionModule } from 'src/shared/infrastructure/utils/encryption/encryption.module';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { AuthModule } from 'src/shared/infrastructure/utils/auth/auth.module';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { AuthService } from 'src/shared/application/utils/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    EncryptionModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    LoginUseCase,
    {
      provide: Providers.USER_REPOSITORY_IMPL,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (user: UserRepository, encryption: Encryption) => {
        return new CreateUserUseCase(user, encryption);
      },
      inject: [Providers.USER_REPOSITORY_IMPL, Providers.ENCRYPTION],
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
  ],
  exports: [Providers.USER_REPOSITORY_IMPL],
})
export class UserModule {}
