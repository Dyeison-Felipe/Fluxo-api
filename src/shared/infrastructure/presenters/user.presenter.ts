import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty({ example: 'crazy', description: 'username login' })
  username: string;
}
