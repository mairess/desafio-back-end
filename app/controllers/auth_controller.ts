import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const userData = await request.validateUsing(registerValidator)

    const user = await this.authService.register(userData)

    return response.created(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const token = await this.authService.login(email, password)

    return response.ok(token)
  }

  async logout({ auth, response }: HttpContext) {
    await this.authService.logout(auth)

    return response.ok({ message: 'Logged out successfully!' })
  }

  async me({ auth, response }: HttpContext) {
    const loggedUser = await this.authService.me(auth)

    return response.ok(loggedUser)
  }
}
