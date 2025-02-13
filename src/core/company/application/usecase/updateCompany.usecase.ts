import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { CompanyRepository } from "../../domain/repositories/company.repository";
import { CompanyOutput } from "../../infrastructure/output/company.output";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";

type Input = {
  id: number;
  name?: string;
  fantasyName?: string;
  cnpj?: string;
  email?: string;
  phoneNumber?: string;
  address?: {
    id: number;
    cep?: string;
    country?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: number;
    complement?: string;
    ownerType?: number;
  };
};

type Output = CompanyOutput;

export class UpdateCompanyUseCase implements UseCase<Input, Output> {
  constructor(private readonly companyRepository: CompanyRepository) {};

  async execute(input: Input): Promise<Output> {
    const company = await this.companyRepository.findAllCompanyById(input.id, input.address.id);

    if(!company) {
      throw new ResourceNotFoundError(`Company id ${input.id} not found`);
    }

    company.name = input.name;
    company.fantasyName = input.fantasyName;
    company.cnpj = input.cnpj;
    company.email = input.email;
    company.phoneNumber = input.phoneNumber;
    company.address.cep = input.address.cep;
    company.address.country = input.address.country;
    company.address.state = input.address.state;
    company.address.city = input.address.city;
    company.address.neighborhood = input.address.neighborhood;
    company.address.street = input.address.street;
    company.address.number = input.address.number;
    company.address.complement = input.address.complement;
    company.address.ownerType.id = input.address.ownerType;

    const updateCompany = await this.companyRepository.update(company);

    const compnayOutput: Output = {...updateCompany};

    return compnayOutput;
  }
}