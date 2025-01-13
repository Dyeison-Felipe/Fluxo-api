import { UseCase } from 'src/shared/application/useCase/useCase.interface';
import { OwnerTypeRepository } from '../../domain/ownerType.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resourceNotFoundError';
import { BadRequestError } from 'src/shared/application/errors/badRequest';

export type Input = {
  id: number;
};

type Output = void;

export class DeleteOwnerTypeUseCase implements UseCase<Input, Output> {
  constructor(private readonly ownerTypeRepository: OwnerTypeRepository) {}

  async execute({ id }: Input): Promise<Output> {
    if (!id) {
      throw new BadRequestError(`Owner id cannot be null or empty`);
    }

    const exist = await this.ownerTypeRepository.findById(id);

    if (!exist) {
      throw new ResourceNotFoundError(`ownerAddress id ${id} not found`);
    }

    await this.ownerTypeRepository.delete(id);
  }
}
