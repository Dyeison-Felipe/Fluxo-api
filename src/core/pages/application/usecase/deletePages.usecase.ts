import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { PagesRepository } from "../../domain/repositories/pages.repository";
import { BadRequestError } from "src/shared/application/errors/badRequest";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";

type Input = {
  id: number;
}

type Output = void;

export class DeletePagesUseCase implements UseCase<Input, Output> {
  constructor(private readonly pageRepository: PagesRepository) {}

  async execute({id}: Input): Promise<void> {
    if(!id) {
      throw new BadRequestError('O campo id não pode estar vazio')
    }

    const existPage = await this.pageRepository.findById(id);

    if(!existPage) {
      throw new ResourceNotFoundError(`Page ${id} not found`)
    }

    await this.pageRepository.delete(id);
  }
}