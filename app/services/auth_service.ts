import User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { UserDataType } from '../types/user.js'
import { Authenticators } from '@adonisjs/auth/types'

export default class AuthService {
  async register(userData: UserDataType) {
    const createdUser = await User.create(userData)

    const user = createdUser.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
    })

    return user
  }

  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)

    const userToken = await User.accessTokens.create(user)

    const token = { token: userToken.value?.release() }

    return token
  }

  async logout(auth: Authenticator<Authenticators>) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  async me(auth: Authenticator<Authenticators>) {
    await auth.check()

    return auth.user
  }
}
