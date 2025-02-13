import { UseCase } from "src/shared/application/useCase/useCase.interface"
import { CompanyRepository } from "../../domain/repositories/company.repository"
import { Company } from "../../domain/company.entity";
import { OwnerTypeRepository } from "src/core/ownerType/domain/repository/ownerType.repository";
import { CompanyOutput } from "../../infrastructure/output/company.output";

type Input = {
  name: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  address: {
    cep: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
    ownerType: number;
  };
}

type Output = CompanyOutput;

export class CreateCompanyUseCase implements UseCase<Input, Output> {
  constructor(private readonly companyRepository: CompanyRepository,
    private readonly ownerTypeRepository: OwnerTypeRepository,
  ) { }

  async execute(input: Input): Promise<Output> {

    const existOwnerType = await this.ownerTypeRepository.findById(input.address.ownerType);

    const entity = new Company({
      name: input.name,
      fantasyName: input.fantasyName,
      cnpj: input.cnpj,
      email: input.email,
      phoneNumber: input.phoneNumber,
      address: {
        cep: input.address.cep,
        country: input.address.country,
        state: input.address.state,
        city: input.address.city,
        neighborhood: input.address.neighborhood,
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        ownerType: existOwnerType,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      },
    });

    const create = await this.companyRepository.create(entity);

    const output: Output = create;

    return output;
  }
}