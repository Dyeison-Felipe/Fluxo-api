import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
