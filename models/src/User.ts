import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { Role } from './Role'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    username!: string

  @Column()
    address!: string

  @Column({ unique: true })
    email!: string

  @Column()
    role!: Role
}
