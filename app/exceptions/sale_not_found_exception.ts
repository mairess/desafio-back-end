import { Exception } from '@adonisjs/core/exceptions'

export default class SaleNotFoundException extends Exception {
  constructor(id: string) {
    super(`Sale not found with id ${id}`, { status: 404 })
  }
}
