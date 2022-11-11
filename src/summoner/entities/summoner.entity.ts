import { Rank } from 'src/ranks/entities/rank.entity'
import { Region } from 'src/regions/entities/region.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Summoner {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  level!: number

  @Column()
  icon!: number

  @ManyToOne(() => Region)
  regionId!: number

  @ManyToOne(() => Rank)
  rankId!: number
}
