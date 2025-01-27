import { ApiProperty } from '@nestjs/swagger';

export class OwnerTypePresenter {
  @ApiProperty({ example: '1', description: 'Id register OwnerAddress' })
  id: number;

  @ApiProperty({ example: 'company', description: 'type OwnerAddress' })
  type: string;
}
