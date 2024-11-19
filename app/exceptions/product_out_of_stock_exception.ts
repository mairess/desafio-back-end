import { Exception } from '@adonisjs/core/exceptions'

export default class ProductOutOfStockException extends Exception {
  constructor(id: number) {
    super(`Product id ${id} is out of stock`, { status: 404 })
  }
}
