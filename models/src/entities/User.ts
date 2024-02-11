import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm'
import { ActiveStatus } from '../enums/ActiveStatus'
import { Role } from './Role'

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
    id!: string

  @Column()
    username!: string

  @Column()
    address!: string

  @Column({ unique: true })
    email!: string

  @Column()
    role!: Role

  @Column({
    type: 'varchar',
    enum: ActiveStatus
  })
    active!: ActiveStatus
}
