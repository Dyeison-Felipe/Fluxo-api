import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { RoleOutput } from '../../infrastructure/output/role.output';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { BadRequestError } from 'src/shared/application/errors/badRequest';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { Role } from '../../domain/role.entity';

type Input = {
  id: number;
  name: string;
};

type Output = RoleOutput;

export class UpdateRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute({ id, name }: Input): Promise<RoleOutput> {
    if (!id) {
      throw new BadRequestError(`id not found`);
    }

    if (!name) {
      throw new BadRequestError(`name not found`);
    }

    const roleEntity = await this.roleRepository.findById(id);

    if (!roleEntity) {
      throw new ResourceNotFoundError(`Role ${id} not found`);
    }

    roleEntity.name = name;

    const updatedRole = await this.roleRepository.update(roleEntity);

    const output: Output = new Role(updatedRole);

    return output;
  }
}
