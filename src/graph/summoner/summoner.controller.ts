import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateSummonerDto } from './dto/create-sumoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  SummonerNode,
  SummonerOmittingPasswordHash
} from './entities/summoner.entity'
import { SummonerService } from './summoner.service'

@ApiTags('Graph Summoners')
@Controller('graph/summoners')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Post()
  async create(
    @Body() createSummonerDto: CreateSummonerDto
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.create(createSummonerDto)

    if (!summoner) throw new NotFoundException('Error creating summmoner')

    return summoner.toJson()
  }

  @Patch(':id')
  async update(
    @Body() updateSummonerDto: UpdateSummonerDto
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.update(updateSummonerDto)

    if (!summoner) throw new NotFoundException()

    return summoner.toJson()
  }

  @Get()
  async findAll(): Promise<SummonerOmittingPasswordHash[]> {
    const summoners = await this.summonerService.findAll()

    return summoners.map((summoner: SummonerNode) => summoner.toJson())
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.findOne(id)

    return summoner.toJson()
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.summonerService.remove(id)
  }
}
