import { Exception } from '@adonisjs/core/exceptions'

export default class ProductOutOfStockException extends Exception {
  constructor() {
    super('Product is out of stock', { status: 404 })
  }
}
