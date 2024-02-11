import { AppDataSource } from '../../app'
import { type ObjectType, type Repository, type BaseEntity } from 'typeorm'

export const getRepository = <Entity extends BaseEntity>(entity: ObjectType<Entity>): Repository<Entity> => {
  return AppDataSource.manager.getRepository(entity)
}
