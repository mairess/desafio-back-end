import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import ProductOutOfStockException from './product_out_of_stock_exception.js'
import NotFoundException from './not_found_exception.js'
import { Exception } from '@adonisjs/core/exceptions'

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
    if (error instanceof ProductOutOfStockException) {
      return ctx.response.status(error.status).send({
        errors: [{ message: error.message, rule: 'product.outOfStock', field: 'productId' }],
      })
    }

    if (error instanceof NotFoundException) {
      const entity = error.message.split(' ')[0].toLocaleLowerCase()

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

    if (error instanceof Exception && error.status === 404) {
      const entity = 'route'
      const unknownRoute = ctx.request.url()

      return ctx.response.status(error.status).send({
        errors: [
          {
            message: `The requested resource ${unknownRoute} was not found`,
            rule: `${entity}.notFound`,
            field: `route`,
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
