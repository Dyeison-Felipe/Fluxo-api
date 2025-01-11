import { Module } from '@nestjs/common';
import { CreateOwnerTypeUseCase } from '../application/usecases/create.usecase';
import { OwnerTypeImpl } from './ownerType.repository';
import { OwnerTypeRepository } from '../domain/ownerType.repository';
import { OwnerTypeController } from './ownerType.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerTypeSchema } from './ownerType.schema';
import { FindAllOwnerTypeUseCaseUseCase } from '../application/usecases/findAll.usecase';
import { FindOwnerTypeByIdUseCase } from '../application/usecases/findById.usecase';
import { UpdateOwnerTypeUseCase } from '../application/usecases/update.usecase';
import { DeleteOwnerTypeUseCase } from '../application/usecases/delete.usecase';
import { FindAllOwnerTypePaginatedUseCase } from '../application/usecases/findAllPaginate';

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
      provide: OwnerTypeImpl,
      useClass: OwnerTypeImpl,
    },
    {
      provide: CreateOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new CreateOwnerTypeUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
    {
      provide: FindAllOwnerTypeUseCaseUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindAllOwnerTypeUseCaseUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
    {
      provide: FindOwnerTypeByIdUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindOwnerTypeByIdUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
    {
      provide: UpdateOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new UpdateOwnerTypeUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
    {
      provide: DeleteOwnerTypeUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new DeleteOwnerTypeUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
    {
      provide: FindAllOwnerTypePaginatedUseCase,
      useFactory: (ownerAddress: OwnerTypeRepository) => {
        return new FindAllOwnerTypePaginatedUseCase(ownerAddress);
      },
      inject: [OwnerTypeImpl],
    },
  ],
})
export class OwnerTypeModule {}
