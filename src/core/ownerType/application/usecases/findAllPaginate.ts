import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerTypeRepository } from '../../domain/ownerType.repository';
import { OwnerTypeOutput } from 'src/shared/application/output/ownerType.output';
import { Pagination } from 'nestjs-typeorm-paginate';

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

    const result = await this.ownerTypeRepository.findAllPaginate({
      page,
      limit,
    });

    return result;
  }
}
