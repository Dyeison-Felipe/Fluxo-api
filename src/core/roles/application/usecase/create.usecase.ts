import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { RoleOutput } from '../../infrastructure/output/role.output';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { ErrorMessages } from 'src/shared/application/constants/errorMessages';
import { Role } from '../../domain/role.entity';
import { RolesPagesRepository } from 'src/core/rolesPages/domain/repositories/rolesPages.repository';
import { PagesRepository } from 'src/core/pages/domain/repositories/pages.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

export type Input = {
  name: string;
  pagesIds: number[];
};

export type Output = RoleOutput;

export class CreateRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository,
    private readonly pagesRepository: PagesRepository,
    private readonly rolesPagesRepository: RolesPagesRepository,
  ) {}

  async execute({ name, pagesIds }: Input): Promise<Output> {

    const existRole = await this.roleRepository.findByName(name);

    if (existRole) {
      throw new ConflictError(ErrorMessages.conflict(name));
    }

    const roleEntity = new Role({ name: name });

    const createRole = await this.roleRepository.create(roleEntity);

    await Promise.all(
      pagesIds.map(async (number) => {
        const pages = await this.pagesRepository.findById(number);
        if(!pages){
          throw new ResourceNotFoundError(`Page id ${number} not found`)
        }
        await this.rolesPagesRepository.create({role: createRole, page: pages})
      })
    )

    if (createRole.id) {
      return { ...createRole };
    }
    console.log(`Erro ao criar role`);
  }
}
