import { type NextFunction, type Request, type Response } from 'express'
import { AuthService } from '../service/AuthService'
import { sendResponse } from '../utils/appUtils'
import { type LoginRequest } from '../dto/LoginRequest'

export class AuthController {
  public login = (req: Request, res: Response, next: NextFunction): void => {
    const authService = new AuthService()
    authService.login(req.body as LoginRequest).then(
      (auth) => {
        if (auth.sessionToken != null) {
          res.cookie('sessionToken', auth.sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 10 * 60 * 1000
          })
        }
        sendResponse(res, auth.status, auth.success, auth.message, auth.data)
      }
    ).catch(next)
  }

  public logout = (req: Request, res: Response, next: NextFunction): void => {
    const authService = new AuthService()
    authService.logout().then(
      (auth) => {
        res.clearCookie('sessionToken')
        sendResponse(res, auth.status, auth.success, auth.message, auth.data)
      }
    ).catch(next)
  }
}
