import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerType } from '../../domain/ownerType.entity';
import { OwnerTypeOutput } from 'src/core/ownerType/infrastructure/output/ownerType.output';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';
import { ErrorMessages } from 'src/shared/application/constants/errorMessages';
import { OwnerTypeRepository } from '../../domain/repository/ownerType.repository';

export type Input = {
  type: string;
};

export type Output = OwnerTypeOutput;

export class CreateOwnerTypeUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute(input: Input): Promise<Output> {
    if (!input.type) {
      throw new BadRequestError(`Owner type cannot be null or empty`);
    }

    const exist = await this.ownerTypeRepository.existType(input.type);

    if (exist) {
      throw new ConflictError(ErrorMessages.conflict(input.type));
    }

    const ownerAddressEntity = new OwnerType({ type: input.type });

    const createdOwnerAddress =
      await this.ownerTypeRepository.create(ownerAddressEntity);

    return createdOwnerAddress;
  }
}
