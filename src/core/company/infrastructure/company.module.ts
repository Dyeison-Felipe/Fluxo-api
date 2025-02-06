import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from './company.schema';
import { OwnerTypeModule } from 'src/core/ownerType/infrastructure/ownerType.module';
import { CompanyController } from './controller/company.controller';
import { CreateCompanyUseCase } from '../application/usecase/createCompany.usecase';
import { Providers } from 'src/shared/infrastructure/constants/moduleConstants';
import { CompanyRepositoryImpl } from './typeorm/repositories/company.repositories';
import { CompanyRepository } from '../domain/repositories/company.repository';
import { OwnerTypeRepository } from 'src/core/ownerType/domain/repository/ownerType.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySchema]), OwnerTypeModule],
  controllers: [CompanyController],
  providers: [
    CreateCompanyUseCase,
    {
      provide: Providers.COMPANY_REPOSITORY,
      useClass: CompanyRepositoryImpl,
    },
    {
      provide: CreateCompanyUseCase,
      useFactory: (companyRepository: CompanyRepository, ownerTypeRepository: OwnerTypeRepository) => {
        return new CreateCompanyUseCase(companyRepository, ownerTypeRepository)
      },
      inject: [Providers.COMPANY_REPOSITORY, Providers.OWNER_TYPE],
    },
  ],
  exports: [Providers.COMPANY_REPOSITORY],
})
export class CompanyModule {}
