import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerAddressDto {
  @ApiProperty({ description: 'Owner Type' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
