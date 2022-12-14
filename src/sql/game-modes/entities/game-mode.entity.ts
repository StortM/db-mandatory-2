import { Length } from 'class-validator'
import { Match } from 'src/sql/matches/entities/match.entity'
import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GameMode {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  @Length(1, 45)
  name!: string

  @OneToMany(() => Rank, (rank) => rank.gameMode)
  ranks?: Rank[]

  @OneToMany(() => Match, (match) => match.gameMode)
  match?: Match
}
