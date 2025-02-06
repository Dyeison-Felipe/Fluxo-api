import { AddressRepository } from "src/core/address/domain/repositories/address.repository";
import { AddressSchema } from "../../address.schema";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/core/address/domain/address.entity";

export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    @InjectRepository(AddressSchema)
    private readonly addressRepository: Repository<AddressSchema>
  ) { }
  async create(createDto: Address): Promise<Address> {
    const entity = await this.addressRepository.save(createDto);

    return entity;
  }
}