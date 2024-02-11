import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

export const dbUrl = process.env.DB_URL ?? ''
