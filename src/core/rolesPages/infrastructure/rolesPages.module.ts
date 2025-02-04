import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolePagesSchema } from "./rolesPages.schema";
import { Providers } from "src/shared/infrastructure/constants/moduleConstants";
import { RolesPagesRepositoryImpl } from "./typeorm/repositories/rolesPages.repository";
import { PageModule } from "src/core/pages/infrastructure/pages.module";
import { RoleModule } from "src/core/roles/infrastructure/role.module";

@Module({
  imports: [TypeOrmModule.forFeature([RolePagesSchema]), PageModule, forwardRef(() => RoleModule)],
  providers: [
    {
      provide: Providers.ROLES_PAGES_REPOSITORY,
      useClass: RolesPagesRepositoryImpl,
    },
  ],
  exports: [Providers.ROLES_PAGES_REPOSITORY],
})
export class RolesPagesModule {}
