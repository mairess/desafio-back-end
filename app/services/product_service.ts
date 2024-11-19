import NotFoundException from '#exceptions/not_found_exception'
import Product from '#models/product'
import { DateTime } from 'luxon'
import { ProductDataType } from '../types/product.js'

export default class ProductService {
  async index(page: number, limit: number) {
    const products = await Product.query()
      .select('id', 'name', 'description', 'price')
      .orderBy('name', 'asc')
      .paginate(page, limit)

    return products
  }

  async show(productId: number) {
    const product = await Product.query().where('id', productId).first()

    if (!product) {
      throw new NotFoundException('Product', productId)
    }

    return product
  }

  async store(productData: ProductDataType) {
    const createdProduct = await Product.create(productData)

    return createdProduct.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async update(productId: number, productData: ProductDataType) {
    const product = await Product.find(productId)

    if (!product) throw new NotFoundException('Product', productId)

    await product.merge(productData).save()

    return product.serialize({ fields: { omit: ['createdAt', 'updatedAt', 'deletedAt'] } })
  }

  async destroy(productId: number) {
    const product = await Product.find(productId)

    if (!product || product.deletedAt !== null) throw new NotFoundException('Product', productId)

    product.deletedAt = DateTime.now()

    await product.save()
  }
}
