import { Exception } from '@adonisjs/core/exceptions'

export default class AddressNotFoundException extends Exception {
  constructor(id: string) {
    super(`Address not found with id ${id}`, { status: 404 })
  }
}
