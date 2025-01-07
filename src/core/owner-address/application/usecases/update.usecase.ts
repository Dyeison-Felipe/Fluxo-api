import { OwnerAddressOutput } from 'src/shared/application/dto/output/ownerAddress.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';

type Input = {
  id: number;
  type: string;
};

type Output = OwnerAddressOutput;

export class UpdateUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute(input: Input): Promise<OwnerAddressOutput> {
    const exist = await this.ownerAddressRepository.findById(input.id);

    if (!exist) {
      throw new ResourceNotFoundError(`ownerAddress id ${input.id} not found`);
    }

    exist.type = input.type;

    const updated = await this.ownerAddressRepository.update(exist);

    const output: Output = updated;

    return output;
  }
}
