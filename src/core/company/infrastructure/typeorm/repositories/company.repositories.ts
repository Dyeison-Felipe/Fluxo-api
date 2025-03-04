import { InjectRepository } from "@nestjs/typeorm";
import { Company, CompanyProps } from "src/core/company/domain/company.entity";
import { CompanySchema } from "../../company.schema";
import { Repository } from "typeorm";
import { CompanyRepository } from "src/core/company/domain/repositories/company.repository";

export class CompanyRepositoryImpl implements CompanyRepository {
  constructor(@InjectRepository(CompanySchema)
  private readonly companyRepository: Repository<CompanySchema>) { }

  async create(create: Company): Promise<Company> {
    const entity = await this.companyRepository.save(create);

    return entity;
  }

  async update(update: Company): Promise<Company> {
    const entity = await this.companyRepository.save(update);

    return entity;
  }

  async findAllCompanyById(id: number, addressId: number): Promise<Company> {
    const entity = await this.companyRepository.findOne({
      relations: ['address'],
      where: { 
        id, 
        address: { id: addressId } 
      }
    });

    return entity;
  }
}