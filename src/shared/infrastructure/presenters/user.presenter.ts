import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty({ example: 'crazy', description: 'username login' })
  username: string;

  @ApiProperty({ example: '123456789', description: 'password login' })
  password: string;
}
