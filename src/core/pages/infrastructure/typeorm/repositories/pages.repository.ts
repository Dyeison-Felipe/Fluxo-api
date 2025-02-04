import { PagesRepository } from "src/core/pages/domain/repositories/pages.repository";
import { PagesSchema } from "../../pages.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Pages } from "src/core/pages/domain/pages.entity";

export class PagesRepositoryImpl implements PagesRepository {
  constructor(
    @InjectRepository(PagesSchema)
    private readonly pageRepository: Repository<PagesSchema>,
  ) {}
  async findAll(): Promise<Pages[]> {
    const list = await this.pageRepository.find();

    return list;
  }

  async create(role: Pages): Promise<Pages> {
    const schema = await this.pageRepository.save(role);

    const entity = new Pages(schema);

    return entity;
  }

  async update(role: Pages): Promise<Pages> {
    const updatePage = await this.pageRepository.save(role);

    return updatePage;
  }

  async delete(id: number): Promise<void> {

    await this.pageRepository.delete(id);

    return 
  }

  async findByName(name: string): Promise<Pages> {
    const existPage = await this.pageRepository.findOne({ where: { name } });

    return existPage;
  }

  async findById(id: number): Promise<Pages> {
    const existPage = await this.pageRepository.findOne({ where: { id } });

    return existPage;
  }

  async findByIds(ids: number[]): Promise<Pages[]> {
    const pagesIds = await this.pageRepository.find({
      where: {
        id: In(ids)
      }
    })

    return pagesIds;
  }
}
