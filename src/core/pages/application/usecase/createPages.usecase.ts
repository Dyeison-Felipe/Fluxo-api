import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { PagesOutput } from "../../infrastructure/output/pages.output";
import { PagesRepository } from "../../domain/repositories/pages.repository";
import { ConflictError } from "src/shared/application/errors/conflictExceptionError";
import { ErrorMessages } from "src/shared/application/constants/errorMessages";
import { Pages } from "../../domain/pages.entity";

export type Input = {
  name: string;
};

export type Output = PagesOutput;

export class CreatePagesUseCase implements UseCase<Input, Output> {
  constructor(private readonly pageRepository: PagesRepository) {}

  async execute({ name }: Input): Promise<Output> {
    const existPage = await this.pageRepository.findByName(name);

    if (existPage) {
      throw new ConflictError(ErrorMessages.conflict(name));
    }

    const PagesEntity = new Pages({ name: name });

    const createPage = await this.pageRepository.create(PagesEntity);

    return createPage;
  }
}
