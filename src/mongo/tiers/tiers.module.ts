import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TiersController } from './tiers.controller'
import { TiersService } from './tiers.service'
import { Tier, TierSchema } from './schemas/tiers.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tier.name, schema: TierSchema }])
  ],
  controllers: [TiersController],
  providers: [TiersService]
})
export class TiersModule {}
