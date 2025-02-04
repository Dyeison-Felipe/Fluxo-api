import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Name role' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Id pages' })
  @IsArray()
  pagesIds: number[];
}
