import { type NextFunction, type Request, type Response } from 'express'
import * as httpContext from 'express-http-context'
import { User } from '../../../models/src/entities/User'
import { UserLogin } from '../../../models/src/entities/UserLogin'
import { getRepository } from '../../../models/src/utils/dbUtils'
import { verifyToken } from '../utils/jwtUtils'
import { sendResponse } from '../utils/appUtils'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.sessionToken as string

  if (token === undefined || token === null || token === '') {
    next()
  } else {
    checkAccess(token, res, next)
  }
}

export const checkAccess = (token: string, res: Response, next: NextFunction, roles?: string[]): void => {
  try {
    verifyToken(token)
    const userLoginRepository = getRepository<UserLogin>(UserLogin)
    const userRepository = getRepository<User>(User)
    void userLoginRepository.findOneOrFail({ where: { sessionToken: token } }).then(userLogin => {
      void userRepository.findOneOrFail({ where: { id: userLogin.user.id } }).then(user => {
        httpContext.set('userLogin', userLogin)
        if (roles === undefined) {
          next()
        } else if (roles.includes(user.role.name)) {
          next()
        } else {
          throw new Error('Unauthorized Access')
        }
      })
    })
  } catch (error: unknown) {
    send401(res)
  }
}

export const send401 = (res: Response): void => {
  res.clearCookie('sessionToken')
  sendResponse(res, 401, false, 'Unauthorized Access', null)
}

export const getUserLogin = (): UserLogin => {
  return httpContext.get('userLogin')
}
