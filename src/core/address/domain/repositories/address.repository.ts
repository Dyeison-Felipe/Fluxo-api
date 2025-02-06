import { Address } from "../address.entity";

export interface AddressRepository {
  create(createDto: Address):Promise<Address>;
}