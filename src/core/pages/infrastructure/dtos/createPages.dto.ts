import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePagesDto {
    @ApiProperty({ description: 'Name page' })
    @IsString()
    @IsNotEmpty()
    name: string;
}