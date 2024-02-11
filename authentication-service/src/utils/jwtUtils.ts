import jwt, { type JwtPayload } from 'jsonwebtoken'
import { secretKey } from '../config/config'

const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, secretKey) as JwtPayload
  return decoded
}

const generateSessionToken = (userId: string): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '10m' })
  return token
}

export { generateSessionToken, verifyToken }
