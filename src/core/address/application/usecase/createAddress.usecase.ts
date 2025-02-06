import { UseCase } from "src/shared/application/useCase/useCase.interface";
import { AddressRepository } from "../../domain/repositories/address.repository";
import { AddressOutput } from "../../infrastructure/output/address.output";
import { OwnerTypeRepository } from "src/core/ownerType/domain/repository/ownerType.repository";
import { ResourceNotFoundError } from "src/shared/application/errors/resourceNotFoundError";
import { Address } from "../../domain/address.entity";

type Input = {
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

type Output = AddressOutput

export class CreateAddressUseCase implements UseCase<Input, Output> {
  constructor(private readonly addressRepository: AddressRepository,
    private readonly ownerTypeRepository: OwnerTypeRepository,
  ) { }

  async execute(input: Input): Promise<Output> {
    this.ValidateInput(input);

    const existOwnerType = await this.ownerTypeRepository.findById(input.ownerType);

    if(!existOwnerType) {
      throw new ResourceNotFoundError(`Owner Type not found`);
    }

    const entity = new Address({
      cep: input.cep,
      country: input.country,
      state: input.state,
      city: input.city,
      neighborhood: input.neighborhood,
      street: input.street,
      number: input.number,
      complement: input.complement,
      ownerType: existOwnerType, // Aqui passamos o OwnerType completo
    });

    const saveAddress = await this.addressRepository.create(entity);

    const output: Output = {
      id: saveAddress.id,
      ...saveAddress
    };

    return output;
  }

  private ValidateInput(input: Input): void {
    const requiredFields = [
      'cep',
      'country',
      'state',
      'city',
      'neighborhood',
      'street',
      'number',
      'ownerType',
    ];
    

    const missingFields = requiredFields
    .map(field => (!input[field as keyof Input] ? field : null))
    .filter(field => field !== null); // Filtra os campos que estão faltando

  if (missingFields.length > 0) {
    throw new Error(`The following fields are required: ${missingFields.join(', ')}`);
  }
  }
}