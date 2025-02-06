import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(8)
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
  @IsNotEmpty()
  @MaxLength(6)
  number: number;

  @IsString()
  @IsNotEmpty()
  complement: string;
  
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  ownerType: number;
}