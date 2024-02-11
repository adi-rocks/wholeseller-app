import dotenv from 'dotenv'
import crypto from 'crypto'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export const secretKey = process.env.SECRET_KEY ?? ''
export const sendEmailUrl = process.env.SEND_EMAIL_URL ?? ''
export const populateDBEnums = Boolean(process.env.POPULATE_DB_ENUMS)

export const iv = crypto.randomBytes(16)
