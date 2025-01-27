import { Role } from '../role.entity';

export interface RoleRepository {
  create(role: Role): Promise<Role>;

  findByName(name: string): Promise<Role>;
}
