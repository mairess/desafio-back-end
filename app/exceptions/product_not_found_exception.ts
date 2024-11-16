import { Exception } from '@adonisjs/core/exceptions'

export default class ProductNotFoundException extends Exception {
  constructor(id: string) {
    super(`Product not found with id ${id}`, { status: 404 })
  }
}
