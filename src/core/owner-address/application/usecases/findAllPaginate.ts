import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { OwnerAddressOutput } from 'src/shared/application/output/ownerAddress.output';
import { Pagination } from 'nestjs-typeorm-paginate';

type Input = {
  page: number;
  limit: number;
};

type Output = Pagination<OwnerAddressOutput>;

export class FindAllPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute(pagination: Input): Promise<Output> {
    const { page, limit } = pagination;

    const result = await this.ownerAddressRepository.findAllPaginate({
      page,
      limit,
    });

    return result;
  }
}
