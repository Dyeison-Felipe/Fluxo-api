import { ApiProperty } from '@nestjs/swagger';

export class PagePresenter {
  @ApiProperty({ example: '1', description: 'Id page' })
  id: number;

  @ApiProperty({ example: 'Cadastro', description: 'name page' })
  name: string;
}
