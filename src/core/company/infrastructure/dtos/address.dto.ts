import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsPositive()
  number: number;

  @IsString()
  @IsNotEmpty()
  complement: string;

  @IsNumber()
  @IsPositive()
  ownerType: number;
}