import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { JwtAuthenticatedRequest } from 'src/sql/auth/jwt.strategy'
import { AuthService } from '../auth/auth.service'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  SummonerOmittingPasswordHash,
  SummonerWithFullRank
} from './entities/summoner.entity'
import { SummonerService } from './summoner.service'

@ApiTags('SQL Summoners')
@Controller('sql/summoner')
export class SummonerController {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly authService: AuthService
  ) {}

  // endoint is open but only admins can create admin users
  @Post()
  async create(
    @Body(new ValidationPipe()) createSummonerDto: CreateSummonerDto,
    @Headers('Authorization') auth: string
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const isCreatingAdminUser = createSummonerDto.isAdmin

    if (isCreatingAdminUser) {
      if (auth) {
        const token = auth.split(' ')[1]
        const isAdmin = await this.authService.isAdminToken(token)

        if (!isAdmin) {
          throw new HttpException('Forbidden', 403)
        }
      } else {
        throw new HttpException('Forbidden', 403)
      }
    }

    const res = await this.summonerService.create(createSummonerDto)
    if (!res) throw new HttpException('Not found', HttpStatus.NOT_FOUND)

    return res
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<SummonerOmittingPasswordHash[] | undefined> {
    return await this.summonerService.findAll()
  }

  @Get('rank/:name')
  async getFullRank(
    @Param('name') name: string
  ): Promise<SummonerWithFullRank | undefined> {
    const summonerWithFullRank = await this.summonerService.getSummonerFullRank(
      { name }
    )

    if (!summonerWithFullRank)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)

    return summonerWithFullRank
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const summoner = await this.summonerService.findOne({ id: +id })

    if (!summoner) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return summoner
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSummonerDto: UpdateSummonerDto,
    @Request() req: JwtAuthenticatedRequest
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const summonerFromDB = await this.summonerService.findOne({ id: +id })

    // Autorize admins and summoners
    if (!req.user?.isAdmin && req.user?.id !== summonerFromDB?.id)
      throw new UnauthorizedException()

    return await this.summonerService.update({ id: +id }, updateSummonerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() { user }: JwtAuthenticatedRequest
  ): Promise<void> {
    const summonerFromDB = await this.summonerService.findOne({ id: +id })

    // Autorize admins and summoners
    if (!user.isAdmin && user.id !== summonerFromDB?.id)
      throw new UnauthorizedException()

    return await this.summonerService.remove(+id)
  }
}
