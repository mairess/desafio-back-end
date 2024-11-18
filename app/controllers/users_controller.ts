import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import { updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const users = await User.query().paginate(page, limit)

    return response.ok(users)
  }

  async update({ request, response, params }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) throw new NotFoundException('User', params.id)

    const userData = await request.validateUsing(updateUserValidator, {
      meta: { userId: user.id },
    })

    await user.merge(userData).save()

    return response.ok(
      user.serialize({
        fields: { omit: ['createdAt', 'updatedAt'] },
      })
    )
  }

  async destroy({ response, params }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) throw new NotFoundException('User', params.id)

    await user.delete()

    return response.ok({
      message: 'User deleted successfully!',
    })
  }
}
