import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../application/usecase/create.usecase';
import { UserRepositoryImpl } from './user.repository';
import { UserRepository } from '../domain/user.interface';
import { Encryption } from 'src/shared/application/utils/encryption/encryption';
import { UtilsModule } from 'src/shared/infrastructure/utils/utils.module';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import {
  ENCRYPTION,
  USER_REPOSITORY_IMPL,
} from 'src/shared/infrastructure/constants/moduleConstants';
import { UpdateUserUseCase } from '../application/usecase/update.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), UtilsModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY_IMPL,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (user: UserRepository, encryption: Encryption) => {
        return new CreateUserUseCase(user, encryption);
      },
      inject: [USER_REPOSITORY_IMPL, ENCRYPTION],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (user: UserRepository) => {
        return new UpdateUserUseCase(user);
      },
      inject: [USER_REPOSITORY_IMPL],
    },
  ],
  exports: [],
})
export class UserModule {}
