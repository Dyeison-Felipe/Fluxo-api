import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/core/roles/domain/repositories/role.repository';
import { RolesSchema } from '../../roles.schema';
import { Repository } from 'typeorm';
import { Role } from 'src/core/roles/domain/role.entity';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RolesSchema)
    private readonly roleRepository: Repository<RolesSchema>,
  ) {}
  async findAll(): Promise<Role[]> {
    const list = await this.roleRepository.find();

    return list;
  }

  async create(role: Role): Promise<Role> {
    const schema = await this.roleRepository.save(role);

    const entity = new Role(schema);

    return entity;
  }

  async update(role: Role): Promise<Role> {
    const updateRole = await this.roleRepository.save(role);

    return updateRole;
  }

  async delete(id: number): Promise<void> {

    await this.roleRepository.delete(id);

    return 
  }

  async findByName(name: string): Promise<Role> {
    const existRole = await this.roleRepository.findOne({ where: { name } });

    return existRole;
  }

  async findById(id: number): Promise<Role> {
    const existRole = await this.roleRepository.findOne({ where: { id } });

    return existRole;
  }
}
