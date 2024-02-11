import crypto from 'crypto'
import { secretKey } from '../config/config'

const IV_LENGTH = 12 // For AES-GCM, this is always 12
const AUTH_TAG_LENGTH = 16 // This is a recommended length
const algorithm = 'aes-256-gcm'

const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv, { authTagLength: AUTH_TAG_LENGTH })
  let encrypted = cipher.update(text, 'utf8', 'hex')

  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')

  return iv.toString('hex') + encrypted + authTag
}

const decrypt = (text: any): string => {
  const iv = text.substr(0, IV_LENGTH * 2) as string // Each byte is represented by 2 hex characters
  const authTag = text.substr(-AUTH_TAG_LENGTH * 2) as string // The auth tag is at the end of the string
  const encryptedText = text.slice(IV_LENGTH * 2, -AUTH_TAG_LENGTH * 2) as string // The rest is the encrypted data

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(authTag, 'hex'))

  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()])

  return decrypted.toString()
}

export {
  decrypt, encrypt
}
