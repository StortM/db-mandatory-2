import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { TiersService } from './tiers.service'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'
import { Tier } from './entities/tier.entity'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('SQL Tiers')
@Controller('sql/tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTierDto: CreateTierDto): Promise<Tier | undefined> {
    return this.tiersService.create(createTierDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Tier[] | undefined> {
    return this.tiersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tier | undefined> {
    return this.tiersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTierDto: UpdateTierDto
  ): Promise<Tier | undefined> {
    return this.tiersService.update(id, updateTierDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tiersService.remove(+id)
  }
}
