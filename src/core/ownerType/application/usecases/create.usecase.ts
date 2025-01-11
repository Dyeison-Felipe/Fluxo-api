import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerTypeRepository } from '../../domain/ownerType.repository';
import { OwnerType } from '../../domain/ownerType.entity';
import { OwnerTypeOutput } from 'src/shared/application/output/ownerType.output';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

export type Input = {
  type: string;
};

export type Output = OwnerTypeOutput;

export class CreateOwnerTypeUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute(input: Input): Promise<Output> {
    const exist = await this.ownerTypeRepository.existType(input.type);

    if (!input.type) {
      throw new BadRequestError(`Owner type cannot be null or empty`);
    }

    if (exist) {
      throw new ConflictError(`type ${input.type} already exist`);
    }

    const ownerAddressEntity = new OwnerType({ type: input.type });

    const createdOwnerAddress =
      await this.ownerTypeRepository.create(ownerAddressEntity);

    return createdOwnerAddress;
  }
}
