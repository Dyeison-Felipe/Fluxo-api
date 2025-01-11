import { Repository } from 'typeorm';
import { OwnerTypeRepository } from '../domain/ownerType.repository';
import { OwnerType } from '../domain/ownerType.entity';
import { OwnerTypeSchema } from './ownerType.schema';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

export class OwnerTypeImpl implements OwnerTypeRepository {
  constructor(
    @InjectRepository(OwnerTypeSchema)
    private readonly ownerTypeRepository: Repository<OwnerTypeSchema>,
  ) {}

  async findAll(): Promise<OwnerType[]> {
    const list = await this.ownerTypeRepository.find();

    return list;
  }

  async findAllPaginate(
    options: IPaginationOptions,
  ): Promise<Pagination<OwnerType>> {
    const queryBuilder = this.ownerTypeRepository.createQueryBuilder('o');

    queryBuilder.select(['o.id', 'o.type']);

    queryBuilder.orderBy('o.id', 'ASC');

    const ownerAddressDb = paginate<OwnerTypeSchema>(queryBuilder, options);

    return ownerAddressDb;
  }

  async findById(id: number): Promise<OwnerType> {
    const ownerAddressId = await this.ownerTypeRepository.findOneBy({
      id,
    });

    return ownerAddressId;
  }

  async create(ownerType: OwnerType): Promise<OwnerType> {
    const schema = await this.ownerTypeRepository.save(ownerType);

    const entity = new OwnerType(schema);
    return entity;
  }

  async update(ownerType: OwnerType): Promise<OwnerType> {
    const update = await this.ownerTypeRepository.save(ownerType);

    return update;
  }

  async delete(id: number): Promise<void> {
    await this.ownerTypeRepository.softDelete(id);
  }

  async existType(type: string): Promise<boolean> {
    console.log('Repository existsBy:', this.ownerTypeRepository);
    const count = await this.ownerTypeRepository.count({ where: { type } });
    return count > 0;
  }
}
