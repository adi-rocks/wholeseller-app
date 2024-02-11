import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm'

export enum UserRole {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  User = 'USER'
}

@Entity('roles')
export class Role extends BaseEntity {
  @ObjectIdColumn()
    id!: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User
  })
    name!: UserRole
}
