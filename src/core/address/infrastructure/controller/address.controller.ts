import { Body, Controller, Post } from "@nestjs/common";
import { CreateAddressUseCase } from "../../application/usecase/createAddress.usecase";
import { CreateAddressDto } from "../dto/createAddress.dto";
import { AddressPresenter } from "../presenter/address.presenter";

@Controller('/api/address/v1')
export class AddressController {
  constructor(private readonly createAddresssUseCase: CreateAddressUseCase) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<AddressPresenter> {
    const create = await this.createAddresssUseCase.execute(createAddressDto);

    return create;
  }
}