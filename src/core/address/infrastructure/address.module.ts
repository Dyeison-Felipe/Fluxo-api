import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from './address.schema';
import { AddressController } from './controller/address.controller';
import { CreateAddressUseCase } from '../application/usecase/createAddress.usecase';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { AddressRepositoryImpl } from './typeorm/repositories/address.repository';
import { OwnerTypeRepository } from 'src/core/ownerType/domain/repository/ownerType.repository';
import { AddressRepository } from '../domain/repositories/address.repository';
import { OwnerTypeModule } from 'src/core/ownerType/infrastructure/ownerType.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddressSchema]), OwnerTypeModule],
  controllers: [AddressController],
  providers: [
    CreateAddressUseCase,
    {
      provide: Providers.ADDRESS_REPOSITORY,
      useClass: AddressRepositoryImpl
    },
    {
      provide: CreateAddressUseCase,
      useFactory: (addressRepository: AddressRepository, ownerTypeRepository: OwnerTypeRepository) => {
        return new CreateAddressUseCase(addressRepository, ownerTypeRepository);
      },
      inject: [Providers.ADDRESS_REPOSITORY, Providers.OWNER_TYPE],
    },
  ],
  exports: [Providers.ADDRESS_REPOSITORY],
})
export class AddressModule {}
