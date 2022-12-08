import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PositionsController } from './positions.controller'
import { PositionsService } from './positions.service'
import { Position, PositionSchema } from './schemas/positions.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Position.name, schema: PositionSchema }])
  ],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
