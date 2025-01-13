import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { UserRepositoryImpl } from './user.repository';
import { UserRepository } from '../domain/user.interface';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { UtilsModule } from 'src/shared/infrastructure/utils/utils.module';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), UtilsModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
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
  ],
  exports: [Providers.USER_REPOSITORY_IMPL],
})
export class UserModule {}
