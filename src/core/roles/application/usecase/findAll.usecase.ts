import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { RoleOutput } from '../../infrastructure/output/role.output';
import { RoleRepository } from '../../domain/repositories/role.repository';

type Input = void;

type Output = RoleOutput[];

export class FindAllRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<RoleOutput[]> {
    const listRoles = await this.roleRepository.findAll();

    return listRoles;
  }
}
