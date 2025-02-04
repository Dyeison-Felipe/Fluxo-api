import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class DeleteRoleDto {
  @ApiProperty({example: 1, description: 'Id Role'})
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;
}