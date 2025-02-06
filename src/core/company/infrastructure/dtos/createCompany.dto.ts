import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { Type } from "class-transformer";

export class CreateCompanyDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fantasyName: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ValidateNested() // Valida o objeto address
  @Type(() => AddressDto) // Transforma para o tipo AddressDto
  @IsNotEmpty()
  address: AddressDto;
}