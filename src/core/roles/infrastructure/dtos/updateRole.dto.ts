import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Role id' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
