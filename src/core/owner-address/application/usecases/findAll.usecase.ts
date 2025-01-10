import { OwnerAddressOutput } from 'src/shared/application/output/ownerAddress.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

type Input = object;

type Output = OwnerAddressOutput[];

export class FindAllUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute(): Promise<OwnerAddressOutput[]> {
    const list = await this.ownerAddressRepository.findAll();

    if (!list) {
      throw new ResourceNotFoundError(`list not found`);
    }

    return list;
  }
}
