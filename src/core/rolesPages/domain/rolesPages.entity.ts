import { Pages } from "src/core/pages/domain/pages.entity";
import { Role } from "src/core/roles/domain/role.entity"
import { threadId } from "worker_threads";

type RolesPagesProps = {
  id?: number;
  role: Role;
  page: Pages
}

export class RolesPages {
  id?: number;
  role: Role;
  page: Pages;

  constructor(props?: RolesPagesProps) {
    this.id = props?.id;
    this.role = props?.role;
    this.page = props?.page
  }
}