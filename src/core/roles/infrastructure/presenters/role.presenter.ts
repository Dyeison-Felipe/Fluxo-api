import { ApiProperty } from '@nestjs/swagger';

export class RolePresenter {
  @ApiProperty({ example: '1', description: 'Id role' })
  id: number;

  @ApiProperty({ example: 'admin', description: 'name role' })
  name: string;
}
