import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class UpdatePageDto {
    @ApiProperty({ description: 'Page id' })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    id: number;
  
    @ApiProperty({ description: 'Page name' })
    @IsString()
    @IsNotEmpty()
    name: string;
}