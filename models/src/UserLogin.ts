import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class UserLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    username!: string

  @Column()
    password!: string

  @Column({ unique: true })
    email!: string

  @Column()
    sessionToken!: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
    user!: User
}
