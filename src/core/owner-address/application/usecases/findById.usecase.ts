import { OwnerAddressOutput } from 'src/shared/application/dto/output/ownerAddress.output';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

type Input = {
  id: number;
};

type Output = OwnerAddressOutput;

export class FindByIdUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute({ id }: Input): Promise<OwnerAddressOutput> {
    const ownerAddressId = await this.ownerAddressRepository.findById(id);

    if (!ownerAddressId) {
      throw new ResourceNotFoundError(`ownerAddress id ${id} not found`);
    }

    return ownerAddressId;
  }
}
