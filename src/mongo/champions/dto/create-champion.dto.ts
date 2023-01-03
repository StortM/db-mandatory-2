import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateChampionDto {
  @ApiProperty()
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name!: string
}
