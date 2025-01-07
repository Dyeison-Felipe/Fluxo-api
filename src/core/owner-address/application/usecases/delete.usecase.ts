import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

type Input = {
  id: number;
};

type Output = void;

export class DeleteUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute({ id }: Input): Promise<Output> {
    const exist = await this.ownerAddressRepository.findById(id);

    if (!exist) {
      throw new ResourceNotFoundError(`ownerAddress id ${id} not found`);
    }

    await this.ownerAddressRepository.delete(id);
  }
}
