import CustomerService from '#services/customer_service'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class CustomersController {
  constructor(protected customerService: CustomerService) {}

  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const customers = await this.customerService.index(page, limit)

    return response.ok(customers)
  }

  async show({ request, response, params }: HttpContext) {
    const month = request.input('month')
    const year = request.input('year')

    const customerSales = await this.customerService.show(month, year, params.id)

    return response.ok(customerSales)
  }

  async store({ request, response }: HttpContext) {
    const customerData = await request.validateUsing(createCustomerValidator)

    const createdCustomer = await this.customerService.store(customerData)

    return response.created(createdCustomer)
  }

  async update({ request, response, params }: HttpContext) {
    const customerData = await request.validateUsing(updateCustomerValidator, {
      meta: { customerId: params.id },
    })

    const customerUpdated = await this.customerService.update(params.id, customerData)

    return response.ok(customerUpdated)
  }

  async destroy({ response, params }: HttpContext) {
    await this.customerService.destroy(params.id)

    return response.ok({ message: 'Customer deleted successfully!' })
  }
}
