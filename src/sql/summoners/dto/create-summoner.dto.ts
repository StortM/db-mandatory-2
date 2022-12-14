import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator'
import { CreateRankDto } from 'src/sql/ranks/dto/create-rank.dto'
import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { AlphanumericAllowSpaces } from 'src/validators/AlphanumericAllowSpaces'
import { ContainsNoEmoji } from 'src/validators/emoji.validator'

export class CreateSummonerDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @IsNotEmpty()
  @Validate(ContainsNoEmoji)
  @Validate(AlphanumericAllowSpaces)
  summonerName!: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(45)
  @IsNotEmpty()
  @Validate(ContainsNoEmoji)
  password!: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Max(2147483647)
  level!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Max(2438)
  icon!: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  regionName!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean

  @ApiProperty()
  @IsOptional()
  @Type(() => CreateRankDto)
  rank?: Rank
}
