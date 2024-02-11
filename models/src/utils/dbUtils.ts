import { AppDataSource } from '../../../auth-service/app'
import { type ObjectType, type Repository, type BaseEntity } from 'typeorm'
import { Role, UserRole } from '../entities/Role'

export const getRepository = <Entity extends BaseEntity>(entity: ObjectType<Entity>): Repository<Entity> => {
  return AppDataSource.manager.getRepository(entity)
}

export async function createRoles (): Promise<void> {
  const roleRepository = getRepository<Role>(Role)

  for (const role of Object.values(UserRole)) {
    const existingRole = await roleRepository.findOne({ where: { name: role } })
    if (existingRole == null) {
      const newRole = new Role()
      newRole.name = role
      await roleRepository.save(newRole)
    }
  }
}
