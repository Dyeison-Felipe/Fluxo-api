import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Name role' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
