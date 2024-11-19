import NotFoundException from '#exceptions/not_found_exception'
import User from '#models/user'
import { UserDataType } from '../types/user.js'

export default class UserService {
  async index(page: number, limit: number) {
    const users = await User.query().select('id', 'fullName', 'email').paginate(page, limit)

    return users
  }

  async update(userId: number, userData: UserDataType) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User', userId)

    await user.merge(userData).save()

    return user.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async destroy(userId: number) {
    const user = await User.find(userId)

    if (!user) throw new NotFoundException('User', userId)

    await user.delete()
  }
}
