import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { RoleOutput } from '../../infrastructure/output/role.output';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { ErrorMessages } from 'src/shared/application/constants/errorMessages';
import { Role } from '../../domain/role.entity';

export type Input = {
  name: string;
};

export type Output = RoleOutput;

export class CreateRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute({ name }: Input): Promise<Output> {
    const existRole = await this.roleRepository.findByName(name);

    if (existRole) {
      throw new ConflictError(ErrorMessages.conflict(name));
    }

    const roleEntity = new Role({ name: name });

    const createRole = await this.roleRepository.create(roleEntity);

    return createRole;
  }
}
