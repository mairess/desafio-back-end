import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import UserService from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const users = await this.userService.index(page, limit)

    return response.ok(users)
  }

  async update({ request, response, params }: HttpContext) {
    const userData = await request.validateUsing(updateUserValidator, {
      meta: { userId: params.id },
    })

    const user = await this.userService.update(params.id, userData)

    return response.ok(user)
  }

  async destroy({ response, params }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) throw new NotFoundException('User', params.id)

    await this.userService.destroy(params.id)

    return response.ok({ message: 'User deleted successfully!' })
  }
}
