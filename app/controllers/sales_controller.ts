import NotFoundException from '#exceptions/not_found_exception'
import ProductOutOfStockException from '#exceptions/product_out_of_stock_exception'
import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { createSaleValidator } from '#validators/sale'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SalesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const sales = await Sale.query().orderBy('id', 'asc').paginate(page, limit)

    return response.ok(sales.serialize({ fields: { omit: ['updatedAt'] } }))
  }

  async show({ response, params }: HttpContext) {
    const sale = await Sale.query()
      .where('id', params.id)
      .preload('customer')
      .preload('product')
      .first()

    if (!sale) {
      throw new NotFoundException('Sale', params.id)
    }

    return response.ok(sale.serialize({ fields: { omit: ['updatedAt'] } }))
  }

  async store({ request, response }: HttpContext) {
    const saleData = await request.validateUsing(createSaleValidator)

    const product = await Product.find(saleData.productId)
    const customer = await Customer.find(saleData.customerId)

    if (!product) {
      throw new NotFoundException('Product', saleData.productId.toString())
    }

    if (product.stock === 0 || product.stock < saleData.quantity) {
      throw new ProductOutOfStockException()
    }

    if (!customer) {
      throw new NotFoundException('Customer', saleData.customerId.toString())
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
