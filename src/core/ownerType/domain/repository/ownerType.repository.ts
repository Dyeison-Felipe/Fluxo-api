import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { OwnerType } from '../ownerType.entity';

export interface OwnerTypeRepository {
  findAll(): Promise<OwnerType[]>;
  findAllPaginate(options: IPaginationOptions): Promise<Pagination<OwnerType>>;
  findById(id: number): Promise<OwnerType>;
  create(ownerType: OwnerType): Promise<OwnerType>;
  update(ownerType: OwnerType): Promise<OwnerType>;
  delete(id: number): Promise<void>;
  existType(type: string): Promise<boolean>;
}
