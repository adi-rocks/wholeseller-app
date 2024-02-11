import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class UserLogin extends BaseEntity {
  @ObjectIdColumn()
    id!: string

  @Column()
    username!: string

  @Column()
    password!: string

  @Column({ unique: true })
    email!: string

  @Column()
    sessionToken!: string

  @Column()
    user!: User
}
