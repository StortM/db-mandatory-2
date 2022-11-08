import { Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  @Length(1, 45)
  name!: string
}
