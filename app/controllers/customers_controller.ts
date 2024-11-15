import Customer from '#models/customer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const customers = await Customer.query()
      .select('id', 'fullName', 'cpf', 'email')
      .orderBy('id')
      .paginate(page, limit)

    response.ok(customers)
  }
}
