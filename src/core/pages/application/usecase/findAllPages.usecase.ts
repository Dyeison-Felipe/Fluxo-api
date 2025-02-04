import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { PagesRepository } from "../../domain/repositories/pages.repository";
import { PagesOutput } from "../../infrastructure/output/pages.output";

type Input = void;

type Output = PagesOutput[];

export class FindAllPagesUseCase implements UseCase<Input, Output> {
  constructor(private readonly pageRepository: PagesRepository) {}

  async execute(): Promise<PagesOutput[]> {
    const listPages = await this.pageRepository.findAll();

    return listPages;
  }
}
