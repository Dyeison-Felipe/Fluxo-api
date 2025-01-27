import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesSchema } from './roles.schema';
import { CreateRoleUseCase } from '../application/usecase/create.usecase';
import { RoleRepositoryImpl } from './typeorm/repositories/role.repository';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { RoleRepository } from '../domain/repositories/role.repository';
import { RoleController } from './controller/role.controller';
import { FindAllRoleUseCase } from '../application/usecase/findAll.usecase';
import { UpdateRoleUseCase } from '../application/usecase/update.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([RolesSchema])],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    UpdateRoleUseCase,
    FindAllRoleUseCase,
    {
      provide: Providers.ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new CreateRoleUseCase(roleRepository);
      },
      inject: [Providers.ROLE_REPOSITORY],
    },
    {
      provide: FindAllRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new FindAllRoleUseCase(roleRepository);
      },
      inject: [Providers.ROLE_REPOSITORY],
    },
    {
      provide: UpdateRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new UpdateRoleUseCase(roleRepository);
      },
      inject: [Providers.ROLE_REPOSITORY],
    },
  ],
})
export class RoleModule {}
