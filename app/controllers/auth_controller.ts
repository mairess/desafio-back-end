import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const createdUser = await User.create(data)

    const serializedUser = createdUser.serialize({
      fields: ['fullName', 'email', 'id'],
    })

    return response.created(serializedUser)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const userToken = await User.accessTokens.create(user)

    return response.ok({ token: userToken.value?.release() })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({ message: 'Logged out successfully!' })
  }

  async me({ auth, response }: HttpContext) {
    await auth.check()

    return response.ok(auth.user)
  }
}
