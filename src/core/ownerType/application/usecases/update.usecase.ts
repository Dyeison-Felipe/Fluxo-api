import { OwnerTypeOutput } from 'src/core/ownerType/infrastructure/output/ownerType.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { ConflictError } from 'src/shared/application/errors/conflictExceptionError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';
import { OwnerTypeRepository } from '../../domain/repository/ownerType.repository';

export type Input = {
  id: number;
  type: string;
};

type Output = OwnerTypeOutput;

export class UpdateOwnerTypeUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute(input: Input): Promise<OwnerTypeOutput> {
    if (!input.id) {
      throw new BadRequestError('Owner id cannot be null or empty');
    }

    if (!input.type) {
      throw new BadRequestError('Owner type cannot be null or empty');
    }
    const existOwnerType = await this.ownerTypeRepository.findById(input.id);

    if (!existOwnerType) {
      throw new ResourceNotFoundError(`Owner Type id ${input.id} not found`);
    }

    const existType = await this.ownerTypeRepository.existType(input.type);

    if (existType) {
      throw new ConflictError(`Owner Type ${input.type} already exist`);
    }

    existOwnerType.type = input.type;

    const updated = await this.ownerTypeRepository.update(existOwnerType);

    const output: Output = updated;

    return output;
  }
}
