import NotFoundException from '#exceptions/not_found_exception'
import Customer from '#models/customer'
import { RawQuery } from '@adonisjs/lucid/types/querybuilder'
import { CustomerDataType } from '../types/customer.js'
import db from '@adonisjs/lucid/services/db'

export default class CustomerService {
  async index(page: number, limit: number) {
    const customers = await Customer.query()
      .select('id', 'fullName', 'cpf', 'email')
      .orderBy('id')
      .paginate(page, limit)

    return customers
  }

  async show(month: RawQuery, year: RawQuery, customerId: number) {
    const customerSales = await Customer.query()
      .where('id', customerId)
      .preload('addresses', (addressQuery) => {
        addressQuery.select(
          'id',
          'street',
          'number',
          'neighborhood',
          'city',
          'state',
          'zipCode',
          'country',
          'createdAt',
          'updatedAt'
        )
      })
      .preload('phones', (phoneQuery) => {
        phoneQuery.select('id', 'phoneNumber', 'createdAt', 'updatedAt')
      })
      .preload('sales', (salesQuery) => {
        if (month) {
          salesQuery.whereRaw('MONTH(created_at) = ?', [month])
        }
        if (year) {
          salesQuery.whereRaw('YEAR(created_at) = ?', [year])
        }

        salesQuery.preload('product', (productQuery) => {
          productQuery.select('id', 'name', 'description', 'price')
        })

        salesQuery.orderBy('createdAt', 'desc')
      })
      .first()

    if (!customerSales) throw new NotFoundException('Customer', customerId)

    return customerSales.serialize({
      relations: {
        sales: { fields: { omit: ['customerId', 'productId', 'updatedAt'] } },
        phones: { fields: { omit: ['customerId'] } },
        addresses: { fields: { omit: ['customerId'] } },
      },
    })
  }

  async store(customerData: CustomerDataType) {
    const createdCustomer = await Customer.create(customerData)

    return createdCustomer.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async update(customerId: number, customerData: CustomerDataType) {
    const customer = await Customer.find(customerId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    const customerUpdate = await customer.merge(customerData).save()

    return customerUpdate.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async destroy(customerId: number) {
    const customer = await Customer.find(customerId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    await db.transaction(async (trx) => {
      await customer.related('addresses').query().useTransaction(trx).delete()

      await customer.related('phones').query().useTransaction(trx).delete()

      await customer.related('sales').query().useTransaction(trx).delete()

      await customer.useTransaction(trx).delete()
    })
  }
}
