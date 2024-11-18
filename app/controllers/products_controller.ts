import NotFoundException from '#exceptions/not_found_exception'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ProductsController {
  async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const products = await Product.query()
      .select('id', 'name', 'description', 'price')
      .orderBy('name', 'asc')
      .paginate(page, limit)

    return response.ok(products)
  }

  async show({ response, params }: HttpContext) {
    const product = await Product.query().where('id', params.id).first()

    if (!product) {
      throw new NotFoundException('Product', params.id)
    }

    return response.ok(product)
  }

  async store({ request, response }: HttpContext) {
    const productData = await request.validateUsing(createProductValidator)

    const createdProduct = await Product.create(productData)

    return response.created(
      createdProduct.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async update({ request, response, params }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      throw new NotFoundException('Product', params.id)
    }

    const productData = await request.validateUsing(updateProductValidator)

    await product.merge(productData).save()

    return response.ok(
      product.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt', 'deletedAt'],
        },
      })
    )
  }

  async destroy({ response, params }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product || product.deletedAt !== null) {
      throw new NotFoundException('Product', params.id)
    }

    product.deletedAt = DateTime.now()

    await product.save()

    return response.ok({
      message: 'Product deleted successfully!',
    })
  }
}
