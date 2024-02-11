import { UserLogin } from '../../../models/src/entities/UserLogin'
import { getRepository } from '../../../models/src/utils/dbUtils'
import { type LoginRequest } from '../dto/LoginRequest'
import { type LoginResponse } from '../dto/LoginResponse'
import { ActiveStatus } from '../../../models/src/enums/ActiveStatus'
import { getUserLogin } from '../middleware/auth'
import { getRegisterResponse } from '../utils/appUtils'
import { decrypt } from '../utils/encryptionUtils'
import { generateSessionToken } from '../utils/jwtUtils'

export class AuthService {
  public login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const resUserLogin = getUserLogin()

    if (resUserLogin != null) {
      return { status: 200, success: true, message: 'Already Logged in', data: getRegisterResponse(resUserLogin), sessionToken: '' } satisfies LoginResponse
    }

    const { email, password } = loginRequest
    if (email == null || password == null) {
      return { status: 400, success: false, message: 'Invalid email or password', data: null, sessionToken: '' } satisfies LoginResponse
    }

    const userLoginRepository = getRepository<UserLogin>(UserLogin)
    const userLogin = await userLoginRepository.findOneOrFail({ where: { email } })
    if (userLogin.user.active === ActiveStatus.No) {
      return { status: 500, success: false, message: 'User is not active', data: null, sessionToken: '' } satisfies LoginResponse
    }

    if (decrypt(password) !== userLogin.password) {
      return { status: 401, success: false, message: 'Invalid Credentials', data: null, sessionToken: '' } satisfies LoginResponse
    }

    userLogin.sessionToken = generateSessionToken(userLogin.user.id)
    await userLoginRepository.save(userLogin)

    return { status: 200, success: true, data: getRegisterResponse(userLogin), message: 'Login Successful', sessionToken: userLogin.sessionToken } satisfies LoginResponse
  }

  public logout = async (): Promise<LoginResponse> => {
    const userLogin = getUserLogin()
    if (userLogin == null) {
      return { status: 400, success: false, message: 'User is not logged in', data: null, sessionToken: '' } satisfies LoginResponse
    }

    userLogin.sessionToken = ''
    const userLoginRepository = getRepository<UserLogin>(UserLogin)
    await userLoginRepository.save(userLogin)

    return { status: 200, success: true, message: 'Logout Successful', data: null, sessionToken: '' } satisfies LoginResponse
  }
}
