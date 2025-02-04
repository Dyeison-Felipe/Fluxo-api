import { Pagination } from "nestjs-typeorm-paginate";
import { UserOutput } from "../../infrastructure/output/user.output";
import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { UserRepository } from "../../domain/repository/user.repository";
import { BadRequestError } from "src/shared/application/errors/badRequest";
import { RoleRepository } from "src/core/roles/domain/repositories/role.repository";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";

type Input = {
  roleId: number;
  page: number;
  limit: number;
}

type Output = Pagination<UserOutput>;

export class FindAllUserByRoleIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) { }

  async execute({ page, limit, roleId }: Input): Promise<Output> {
    
    if (!page || !limit || !roleId) {
      throw new BadRequestError(`page and limit cannot be null or empty`);
    }

    const existRole = await this.roleRepository.findById(roleId);

    if(!existRole) {
      throw new ResourceNotFoundError(`Role id ${roleId} not found`);
    }

    const result = await this.userRepository.getUserByRoleId(roleId, {

      page,
      limit,
    });

    return result;
  }
}