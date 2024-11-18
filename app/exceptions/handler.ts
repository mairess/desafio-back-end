import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import CustomerNotFoundException from './customer_not_found_exception.js'
import ProductNotFoundException from './product_not_found_exception.js'
import ProductOutOfStockException from './product_out_of_stock_exception.js'
import PhoneNotFoundException from './phone_not_found_exception.js'
import SaleNotFoundException from './sale_not_found_exception.js'
import UserNotFoundException from './user_not_found_exception.js'
import AddressNotFoundException from './address_not_found_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof CustomerNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'customer.notFound', field: 'customerId' }],
      })
    }

    if (error instanceof ProductNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'product.notFound', field: 'productId' }],
      })
    }

    if (error instanceof ProductOutOfStockException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'product.outOfStock', field: 'productId' }],
      })
    }

    if (error instanceof PhoneNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'phone.notFound', field: 'phoneId' }],
      })
    }

    if (error instanceof SaleNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'sale.notFound', field: 'saleId' }],
      })
    }

    if (error instanceof UserNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'user.notFound', field: 'userId' }],
      })
    }

    if (error instanceof AddressNotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'address.notFound', field: 'addressId' }],
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
