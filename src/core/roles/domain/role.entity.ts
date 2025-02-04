import { RolesPages } from "src/core/rolesPages/domain/rolesPages.entity";

type RoleProps = {
  id?: number;
  name: string;
  pageId?: number[];
};

export class Role {
  id: number;
  name: string;
  constructor(props?: RoleProps) {
    this.id = props?.id;
    this.name = props?.name;
  }
}
