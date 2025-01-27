import { Role } from '../role.entity';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  create(role: Role): Promise<Role>;
  update(role: Role): Promise<Role>;
  findByName(name: string): Promise<Role>;
  findById(id: number): Promise<Role>;
}
