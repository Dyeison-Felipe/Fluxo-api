import { Pages } from "src/core/pages/domain/pages.entity";
import { Role } from "src/core/roles/domain/role.entity";
import { RolesPages } from "../rolesPages.entity";

export interface RolesPagesRepository {
  create(rolesPages: RolesPages): Promise<RolesPages>;
}