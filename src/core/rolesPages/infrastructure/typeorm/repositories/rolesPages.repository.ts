import { RolesPagesRepository } from "src/core/rolesPages/domain/repositories/rolesPages.repository";
import { Repository } from "typeorm";
import { RolePagesSchema } from "../../rolesPages.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { Pages } from "src/core/pages/domain/pages.entity";
import { Role } from "src/core/roles/domain/role.entity";
import { RolesPages } from "src/core/rolesPages/domain/rolesPages.entity";

export class RolesPagesRepositoryImpl implements RolesPagesRepository {
  constructor(
    @InjectRepository(RolePagesSchema)
    private readonly rolesPagesRepsoitory: Repository<RolePagesSchema>) { }

  async create(rolesPages: RolesPages): Promise<RolesPages> {
    
    const savedRolesPages = await this.rolesPagesRepsoitory.save(rolesPages);

    return savedRolesPages;
  }

}