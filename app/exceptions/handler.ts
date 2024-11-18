import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import ProductOutOfStockException from './product_out_of_stock_exception.js'
import NotBelongException from './not_belong_exception.js'
import NotFoundException from './not_found_exception.js'

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
    const errorInstance = (error as NotBelongException) || NotFoundException
    const entity = errorInstance.message.split(' ')[0].toLocaleLowerCase()

    if (error instanceof ProductOutOfStockException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'product.outOfStock', field: 'productId' }],
      })
    }

    if (error instanceof NotBelongException) {
      return ctx.response.status(error.status).send({
        errors: [
          {
            message: error.message,
            rule: `${entity}.notBelong`,
            field: `${entity}Id`,
          },
        ],
      })
    }

    if (error instanceof NotFoundException) {
      return ctx.response.status(error.status).send({
        errors: [
          {
            message: error.message,
            rule: `${entity}.notFound`,
            field: `${entity}Id`,
          },
        ],
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
