import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { RoleRepository } from "../../domain/repositories/role.repository";
import { BadRequestError } from "src/shared/application/errors/badRequest";
import { ErrorMessages } from "src/shared/application/constants/errorMessages";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";

type Input = {
  id: number;
}

type Output = void;

export class DeleteRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute({id}: Input): Promise<void> {
    if(!id) {
      throw new BadRequestError('O campo id não pode estar vazio')
    }

    const existRole = await this.roleRepository.findById(id);

    if(!existRole) {
      throw new ResourceNotFoundError(`Role ${id} not found`)
    }

    await this.roleRepository.delete(id);
  }
}