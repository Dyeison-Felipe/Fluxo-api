import { OwnerTypeOutput } from 'src/shared/application/output/ownerType.output';
import { OwnerTypeRepository } from '../../domain/ownerType.repository';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

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
