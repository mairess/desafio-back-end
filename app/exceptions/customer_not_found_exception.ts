import { Exception } from '@adonisjs/core/exceptions'

export default class CustomerNotFoundException extends Exception {
  constructor(id: string) {
    super(`Customer not found with id ${id}`, { status: 404 })
  }
}
