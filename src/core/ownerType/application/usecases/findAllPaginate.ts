import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerTypeOutput } from 'src/core/ownerType/infrastructure/output/ownerType.output';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BadRequestError } from 'src/shared/application/errors/badRequest';
import { OwnerTypeRepository } from '../../domain/repository/ownerType.repository';

type Input = {
  page: number;
  limit: number;
};

type Output = Pagination<OwnerTypeOutput>;

export class FindAllOwnerTypePaginatedUseCase
  implements UseCase<Input, Output>
{
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute(pagination: Input): Promise<Output> {
    const { page, limit } = pagination;

    if (!page || !limit) {
      throw new BadRequestError(`page and limit cannot be null or empty`);
    }

    const result = await this.ownerTypeRepository.findAllPaginate({
      page,
      limit,
    });

    return result;
  }
}
