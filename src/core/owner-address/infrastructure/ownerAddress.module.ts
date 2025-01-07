import { Module } from '@nestjs/common';
import { CreateOwnerAddressUseCase } from '../application/usecases/create.usecase';
import { OwnerAddressImpl } from './ownerAddress.repository';
import { OwnerAddressRepository } from '../domain/ownerAddress.repository';
import { OwnerAddressController } from './ownerAddress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerAddressSchema } from './ownerAddress.schema';
import { FindAllUseCase } from '../application/usecases/findAll.usecase';
import { FindByIdUseCase } from '../application/usecases/findById.usecase';
import { UpdateUseCase } from '../application/usecases/update.usecase';
import { DeleteUseCase } from '../application/usecases/delete.usecase';
import { FindAllPaginatedUseCase } from '../application/usecases/findAllPaginate';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerAddressSchema])],
  controllers: [OwnerAddressController],
  providers: [
    CreateOwnerAddressUseCase,
    FindAllUseCase,
    FindByIdUseCase,
    UpdateUseCase,
    DeleteUseCase,
    FindAllPaginatedUseCase,
    {
      provide: OwnerAddressImpl,
      useClass: OwnerAddressImpl,
    },
    {
      provide: CreateOwnerAddressUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new CreateOwnerAddressUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
    {
      provide: FindAllUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new FindAllUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
    {
      provide: FindByIdUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new FindByIdUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
    {
      provide: UpdateUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new UpdateUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
    {
      provide: DeleteUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new DeleteUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
    {
      provide: FindAllPaginatedUseCase,
      useFactory: (ownerAddress: OwnerAddressRepository) => {
        return new FindAllPaginatedUseCase(ownerAddress);
      },
      inject: [OwnerAddressImpl],
    },
  ],
})
export class OwnerAddressModule {}
