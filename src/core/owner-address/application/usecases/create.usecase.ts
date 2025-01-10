import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerAddressRepository } from '../../domain/ownerAddress.repository';
import { OwnerAddress } from '../../domain/ownerAddress.entity';
import { OwnerAddressOutput } from 'src/shared/application/output/ownerAddress.output';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

type Input = {
  type: string;
};

type Output = OwnerAddressOutput;

export class CreateOwnerAddressUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly ownerAddressRepository: OwnerAddressRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const exist = await this.ownerAddressRepository.existType(input.type);

    if (!input.type) {
      throw new BadRequestError(`O campo type não deve estar vazio`);
    }

    if (exist) {
      throw new ConflictError(`type ${input.type} alredy exist`);
    }

    const ownerAddressEntity = new OwnerAddress({ type: input.type });

    const createdOwnerAddress =
      await this.ownerAddressRepository.create(ownerAddressEntity);

    return createdOwnerAddress;
  }
}
