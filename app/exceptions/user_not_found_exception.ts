import { Exception } from '@adonisjs/core/exceptions'

export default class UserNotFoundException extends Exception {
  constructor(id: string) {
    super(`User not found with id ${id}`, { status: 404 })
  }
}
