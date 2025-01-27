import { Module } from '@nestjs/common';
import { CreateOwnerTypeUseCase } from '../application/usecases/create.usecase';
import { OwnerTypeRepositoryImpl } from './typeorm/repository/ownerType.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerTypeSchema } from './ownerType.schema';
import { FindAllOwnerTypeUseCaseUseCase } from '../application/usecases/findAll.usecase';
import { FindOwnerTypeByIdUseCase } from '../application/usecases/findById.usecase';
import { UpdateOwnerTypeUseCase } from '../application/usecases/update.usecase';
import { DeleteOwnerTypeUseCase } from '../application/usecases/delete.usecase';
import { FindAllOwnerTypePaginatedUseCase } from '../application/usecases/findAllPaginate';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { OwnerTypeController } from './controller/ownerType.controller';
import { OwnerTypeRepository } from '../domain/repository/ownerType.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerTypeSchema])],
  controllers: [OwnerTypeController],
  providers: [
    CreateOwnerTypeUseCase,
    FindAllOwnerTypeUseCaseUseCase,
    FindOwnerTypeByIdUseCase,
    UpdateOwnerTypeUseCase,
    DeleteOwnerTypeUseCase,
    FindAllOwnerTypePaginatedUseCase,
    {
      provide: Providers.OWNER_TYPE,
      useClass: OwnerTypeRepositoryImpl,
    },
    {
      provide: CreateOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new CreateOwnerTypeUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
    {
      provide: FindAllOwnerTypeUseCaseUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindAllOwnerTypeUseCaseUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
    {
      provide: FindOwnerTypeByIdUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindOwnerTypeByIdUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
    {
      provide: UpdateOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new UpdateOwnerTypeUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
    {
      provide: DeleteOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new DeleteOwnerTypeUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
    {
      provide: FindAllOwnerTypePaginatedUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindAllOwnerTypePaginatedUseCase(ownerAddress);
      },
      inject: [Providers.OWNER_TYPE],
    },
  ],
  exports: [Providers.OWNER_TYPE],
})
export class OwnerTypeModule {}
