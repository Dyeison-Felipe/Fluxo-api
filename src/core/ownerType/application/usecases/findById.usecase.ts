import { OwnerTypeOutput } from 'src/core/ownerType/infrastructure/output/ownerType.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { OwnerTypeRepository } from '../../domain/repository/ownerType.repository';

type Input = {
  id: number;
};

type Output = OwnerTypeOutput;

export class FindOwnerTypeByIdUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute({ id }: Input): Promise<OwnerTypeOutput> {
    const ownerAddressId = await this.ownerTypeRepository.findById(id);

    if (!ownerAddressId) {
      throw new ResourceNotFoundError(`ownerAddress id ${id} not found`);
    }

    return ownerAddressId;
  }
}
