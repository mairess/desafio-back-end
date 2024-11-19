import ProductService from '#services/product_service'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) {}

  async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const products = await this.productService.index(page, limit)

    return response.ok(products)
  }

  async show({ response, params }: HttpContext) {
    const product = await this.productService.show(params.id)

    return response.ok(product)
  }

  async store({ request, response }: HttpContext) {
    const productData = await request.validateUsing(createProductValidator)

    const createdProduct = await this.productService.store(productData)

    return response.created(createdProduct)
  }

  async update({ request, response, params }: HttpContext) {
    const productData = await request.validateUsing(updateProductValidator)

    const product = await this.productService.update(params.id, productData)

    return response.ok(product)
  }

  async destroy({ response, params }: HttpContext) {
    await this.productService.destroy(params.id)

    return response.ok({ message: 'Product deleted successfully!' })
  }
}
