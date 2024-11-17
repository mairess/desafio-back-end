import { Exception } from '@adonisjs/core/exceptions'

export default class PhoneNotFoundException extends Exception {
  constructor(id: string) {
    super(`Phone not found with id ${id}`, { status: 404 })
  }
}
