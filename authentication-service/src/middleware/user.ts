import { type NextFunction, type Request, type Response } from 'express'
import { UserRole } from '../../../models/src/Role'
import { checkAccess, send401 } from './auth'

export const userAccess = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.sessionToken as string

  if (token === undefined || token === null || token === '') {
    send401(res)
  } else {
    checkAccess(token, res, next, [UserRole.User, UserRole.Admin, UserRole.SuperAdmin])
  }
}
