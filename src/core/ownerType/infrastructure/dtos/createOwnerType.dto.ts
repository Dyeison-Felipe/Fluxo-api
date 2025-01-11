import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOwnerTypeDto {
  @ApiProperty({ description: 'Owner Type' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
