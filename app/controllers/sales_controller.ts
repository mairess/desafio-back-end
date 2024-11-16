import CustomerNotFoundException from '#exceptions/customer_not_found_exception'
import ProductNotFoundException from '#exceptions/product_not_found_exception'
import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { createSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const saleData = await request.validateUsing(createSaleValidator)

    const product = await Product.find(saleData.productId)
    const customer = await Customer.find(saleData.customerId)

    if (!product) {
      throw new ProductNotFoundException(saleData.customerId.toString())
    }

    if (!customer) {
      throw new CustomerNotFoundException(saleData.productId.toString())
    }

    const totalPrice = saleData.quantity * product.price
    const unitPrice = product.price

    const createdSale = await Sale.create({ ...saleData, unitPrice, totalPrice })

    return response.created(
      createdSale.serialize({
        fields: { omit: ['updatedAt'] },
      })
    )
  }
}
