import CustomerNotFoundException from '#exceptions/customer_not_found_exception'
import Customer from '#models/customer'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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

  async show({ request, response, params }: HttpContext) {
    const month = request.input('month')
    const year = request.input('year')

    const customerSales = await Customer.query()
      .where('id', params.id)
      .preload('address')
      .preload('phone')
      .preload('sales', (salesQuery) => {
        salesQuery.preload('product').orderBy('createdAt', 'desc')

        if (month) {
          salesQuery.whereRaw('MONTH(created_at) = ?', [month])
        }
        if (year) {
          salesQuery.whereRaw('YEAR(created_at) = ?', [year])
        }
      })
      .first()

    response.ok(
      customerSales?.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
        relations: {
          address: {
            fields: ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'],
          },
          phone: {
            fields: ['phoneNumber'],
          },
          sales: {
            fields: ['id', 'quantity', 'unitPrice', 'totalPrice', 'createdAt'],
            relations: {
              product: {
                fields: ['name', 'description', 'price'],
              },
            },
          },
        },
      })
    )
  }

  async store({ request, response }: HttpContext) {
    const customerData = await request.validateUsing(createCustomerValidator)

    const createdCustomer = await Customer.create(customerData)

    return response.created(
      createdCustomer.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async update({ request, response, params }: HttpContext) {
    const customer = await Customer.find(params.id)

    if (!customer) {
      throw new CustomerNotFoundException(params.id)
    }

    const customerData = await request.validateUsing(updateCustomerValidator, {
      meta: { customerId: customer.id },
    })

    customer.merge(customerData).save()

    return response.ok(
      customer.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async delete({ response, params }: HttpContext) {
    const customer = await Customer.find(params.id)

    if (!customer) {
      throw new CustomerNotFoundException(params.id)
    }

    await db.transaction(async (trx) => {
      await customer.related('address').query().delete()

      await customer.related('phone').query().delete()

      await customer.related('sales').query().delete()

      await customer.useTransaction(trx).delete()
    })

    return response.ok({
      message: 'Customer deleted successfully!',
    })
  }
}
