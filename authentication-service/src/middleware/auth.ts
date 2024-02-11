import { type NextFunction, type Request, type Response } from 'express'
import * as httpContext from 'express-http-context'
import { User } from '../../../models/src/User'
import { UserLogin } from '../../../models/src/UserLogin'
import { getRepository } from '../../../models/utils/dbUtils'
import { sendUnauthorizedResponse } from '../utils/exceptionUtils'
import { verifyToken } from '../utils/jwtUtils'

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
  sendUnauthorizedResponse(res, 'Unauthorized Access')
}
