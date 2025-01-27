import { OwnerTypeOutput } from 'src/core/ownerType/infrastructure/output/ownerType.output';
import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { OwnerTypeRepository } from '../../domain/repository/ownerType.repository';

type Input = object;

type Output = OwnerTypeOutput[];

export class FindAllOwnerTypeUseCaseUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute(): Promise<OwnerTypeOutput[]> {
    const list = await this.ownerTypeRepository.findAll();

    if (!list) {
      throw new ResourceNotFoundError(`list not found`);
    }

    return list;
  }
}
