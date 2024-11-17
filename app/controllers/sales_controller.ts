import CustomerNotFoundException from '#exceptions/customer_not_found_exception'
import ProductNotFoundException from '#exceptions/product_not_found_exception'
import ProductOutOfStockException from '#exceptions/product_out_of_stock_exception'
import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { createSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const saleData = await request.validateUsing(createSaleValidator)

    const product = await Product.find(saleData.productId)
    const customer = await Customer.find(saleData.customerId)

    if (!product) {
      throw new ProductNotFoundException(saleData.productId.toString())
    }

    if (product.stock === 0 || product.stock < saleData.quantity) {
      throw new ProductOutOfStockException()
    }

    if (!customer) {
      throw new CustomerNotFoundException(saleData.customerId.toString())
    }

    const totalPrice = this.calculateTotalPrice(product.price, saleData.quantity)

    const salePayload = { ...saleData, unitPrice: product.price, totalPrice }

    const createdSale = await db.transaction(async (trx) => {
      product.stock -= saleData.quantity
      await product.save()
      return Sale.create(salePayload, { client: trx })
    })

    return response.created(
      createdSale.serialize({
        fields: { omit: ['updatedAt'] },
      })
    )
  }

  private calculateTotalPrice(unitPrice: number, quantity: number) {
    return unitPrice * quantity
  }
}
