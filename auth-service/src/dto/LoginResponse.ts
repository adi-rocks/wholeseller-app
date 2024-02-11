import { type LoginData } from './LoginData'

export interface LoginResponse {
  status: number
  success: boolean
  message: string
  data: LoginData | null
  sessionToken: string
}
