import { RoleOutput } from "src/core/roles/infrastructure/output/role.output";
import { BadRequestError } from "src/shared/application/errors/badRequest";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";
import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { Pages } from "../../domain/pages.entity";
import { PagesRepository } from "../../domain/repositories/pages.repository";

type Input = {
  id: number;
  name: string;
};

type Output = RoleOutput;

export class UpdatePageseUseCase implements UseCase<Input, Output> {
  constructor(private readonly pageRepository: PagesRepository) {}

  async execute({ id, name }: Input): Promise<RoleOutput> {
    if (!id) {
      throw new BadRequestError(`id not found`);
    }

    if (!name) {
      throw new BadRequestError(`name not found`);
    }

    const pagesEntity = await this.pageRepository.findById(id);

    if (!pagesEntity) {
      throw new ResourceNotFoundError(`Role ${id} not found`);
    }

    pagesEntity.name = name;

    const updatedPage = await this.pageRepository.update(pagesEntity);

    const output: Output = new Pages(updatedPage);

    return output;
  }
}
