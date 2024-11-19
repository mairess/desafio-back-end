import NotFoundException from '#exceptions/not_found_exception'
import ProductOutOfStockException from '#exceptions/product_out_of_stock_exception'
import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { SaleDataType } from '../types/sale.js'
import db from '@adonisjs/lucid/services/db'

export class SaleService {
  async index(page: number, limit: number) {
    const sales = await Sale.query().orderBy('id', 'asc').paginate(page, limit)

    return sales.serialize({ fields: { omit: ['updatedAt'] } })
  }

  async show(saleId: number) {
    const sale = await Sale.query()
      .where('id', saleId)
      .preload('customer', (customerQuery) => {
        customerQuery.select('id', 'fullName', 'cpf', 'email')
      })
      .preload('product', (productQuery) => {
        productQuery.select('id', 'name', 'description', 'price', 'stock')
      })
      .first()

    if (!sale) throw new NotFoundException('Sale', saleId)

    return sale.serialize({ fields: { omit: ['customerId', 'productId'] } })
  }

  async store(saleData: SaleDataType) {
    const product = await Product.find(saleData.productId)
    const customer = await Customer.find(saleData.customerId)

    if (!product) throw new NotFoundException('Product', saleData.productId)

    if (product.stock === 0 || product.stock < saleData.quantity)
      throw new ProductOutOfStockException(product.id)

    if (!customer) throw new NotFoundException('Customer', saleData.customerId)

    const totalPrice = this.calculateTotalPrice(product.price, saleData.quantity)

    const salePayload = { ...saleData, unitPrice: product.price, totalPrice }

    const createdSale = await db.transaction(async (trx) => {
      product.stock -= saleData.quantity
      await product.save()
      return Sale.create(salePayload, { client: trx })
    })

    return createdSale.serialize({ fields: { omit: ['updatedAt'] } })
  }

  private calculateTotalPrice(unitPrice: number, quantity: number) {
    return unitPrice * quantity
  }
}
