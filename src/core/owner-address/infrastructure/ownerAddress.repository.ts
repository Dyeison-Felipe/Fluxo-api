import { Repository } from 'typeorm';
import { OwnerAddressRepository } from '../domain/ownerAddress.repository';
import { OwnerAddress } from '../domain/ownerAddress.entity';
import { OwnerAddressSchema } from './ownerAddress.schema';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

export class OwnerAddressImpl implements OwnerAddressRepository {
  constructor(
    @InjectRepository(OwnerAddressSchema)
    private readonly ownerAddressRepository: Repository<OwnerAddressSchema>,
  ) {}

  async findAll(): Promise<OwnerAddress[]> {
    const list = await this.ownerAddressRepository.find();

    return list;
  }

  async findAllPaginate(
    options: IPaginationOptions,
  ): Promise<Pagination<OwnerAddress>> {
    const queryBuilder = this.ownerAddressRepository.createQueryBuilder('o');

    queryBuilder.select(['o.id', 'o.type']);

    queryBuilder.orderBy('o.id', 'ASC');

    const ownerAddressDb = paginate<OwnerAddressSchema>(queryBuilder, options);

    return ownerAddressDb;
  }

  async findById(id: number): Promise<OwnerAddress> {
    const ownerAddressId = await this.ownerAddressRepository.findOneBy({
      id,
    });

    return ownerAddressId;
  }

  async create(ownerAddress: OwnerAddress): Promise<OwnerAddress> {
    const schema = await this.ownerAddressRepository.save(ownerAddress);

    const entity = new OwnerAddress(schema);
    return entity;
  }

  async update(ownerAddress: OwnerAddress): Promise<OwnerAddress> {
    const update = await this.ownerAddressRepository.save(ownerAddress);

    return update;
  }

  async delete(id: number): Promise<void> {
    await this.ownerAddressRepository.softDelete(id);
  }

  async existType(type: string): Promise<boolean> {
    console.log('Repository existsBy:', this.ownerAddressRepository);
    const count = await this.ownerAddressRepository.count({ where: { type } });
    return count > 0;
  }
}
