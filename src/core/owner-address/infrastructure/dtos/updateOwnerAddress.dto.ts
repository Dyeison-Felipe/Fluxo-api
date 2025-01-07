import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOwnerAddressDto {
  @ApiProperty({ description: 'Owner Id' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Owner Type' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
