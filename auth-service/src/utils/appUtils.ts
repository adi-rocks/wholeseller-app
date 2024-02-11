import { type Response } from 'express'
import { type UserLogin } from '../../../models/src/entities/UserLogin'
import { encrypt } from './encryptionUtils'

export const generatePassword = (): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0, n = charset.length; i < 12; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n))
  }
  return encrypt(password)
}

export const getRegisterResponse = (userLogin: UserLogin): any => {
  return {
    id: userLogin.id,
    username: userLogin.username,
    user: userLogin.user
  }
}

export const sendResponse = (res: Response, status: number, success: boolean, message: string, data: unknown): any => {
  return res.status(status).send({
    success,
    message,
    status,
    data
  })
}
