import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesSchema } from './roles.schema';
import { CreateRoleUseCase } from '../application/usecase/create.usecase';
import { RoleRepositoryImpl } from './typeorm/repositories/role.repository';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { RoleRepository } from '../domain/repositories/role.repository';
import { RoleController } from './controller/role.controller';
import { FindAllRoleUseCase } from '../application/usecase/findAll.usecase';
import { UpdateRoleUseCase } from '../application/usecase/update.usecase';
import { DeleteRoleUseCase } from '../application/usecase/deleteRole.usecase';
import { RolesPagesModule } from 'src/core/rolesPages/infrastructure/rolesPages.module';
import { PageModule } from 'src/core/pages/infrastructure/pages.module';
import { PagesRepository } from 'src/core/pages/domain/repositories/pages.repository';
import { RolesPagesRepository } from 'src/core/rolesPages/domain/repositories/rolesPages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolesSchema]), forwardRef(() => RolesPagesModule), PageModule],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    UpdateRoleUseCase,
    FindAllRoleUseCase,
    DeleteRoleUseCase,
    {
      provide: Providers.ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (roleRepository: RoleRepository, pagesRepository: PagesRepository, rolesPagesRepository: RolesPagesRepository) => {
        return new CreateRoleUseCase(roleRepository, pagesRepository, rolesPagesRepository);
      },
      inject: [Providers.ROLE_REPOSITORY, Providers.PAGES_REPOSITORY, Providers.ROLES_PAGES_REPOSITORY],
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
    {
      provide: DeleteRoleUseCase,
      useFactory: (roleRepository: RoleRepository) => {
        return new DeleteRoleUseCase(roleRepository);
      },
      inject: [Providers.ROLE_REPOSITORY],
    },
  ],
  exports: [Providers.ROLE_REPOSITORY]
})
export class RoleModule { }
