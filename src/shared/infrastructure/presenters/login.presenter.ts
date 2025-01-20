import { ApiProperty } from '@nestjs/swagger';
import { Output } from 'src/core/user/application/usecase/create.usecase';

export class LoginPresenter {
  @ApiProperty({ description: 'Logged user ID' })
  readonly id: number;

  @ApiProperty({ description: 'User username' })
  readonly username: string;

  constructor(output: Output) {
    this.id = output.id;
    this.username = output.username;
  }
}
