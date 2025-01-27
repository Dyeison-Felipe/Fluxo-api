import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'user id' })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'new username', description: 'username update' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
