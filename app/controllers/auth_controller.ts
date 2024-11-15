import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const user = await User.create(data)

    return response.created(user)
  }

  async login({}: HttpContext) {}

  async logout({}: HttpContext) {}

  async me({}: HttpContext) {}
}
