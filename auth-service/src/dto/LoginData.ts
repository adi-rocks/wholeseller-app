import { type User } from '../../../models/src/entities/User'

export interface LoginData {
  id: string
  username: string
  user: User
}
