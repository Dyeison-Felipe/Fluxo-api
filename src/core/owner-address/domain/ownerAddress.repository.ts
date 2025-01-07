import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { OwnerAddress } from './ownerAddress.entity';

export interface OwnerAddressRepository {
  findAll(): Promise<OwnerAddress[]>;
  findAllPaginate(
    options: IPaginationOptions,
  ): Promise<Pagination<OwnerAddress>>;
  findById(id: number): Promise<OwnerAddress>;
  create(ownerAddress: OwnerAddress): Promise<OwnerAddress>;
  update(ownerAddress: OwnerAddress): Promise<OwnerAddress>;
  delete(id: number): Promise<void>;
  existType(type: string): Promise<boolean>;
}
