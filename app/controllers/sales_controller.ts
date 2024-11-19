import { SaleService } from '#services/sale_service'
import { createSaleValidator } from '#validators/sale'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class SalesController {
  constructor(protected saleService: SaleService) {}

  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const sales = await this.saleService.index(page, limit)

    return response.ok(sales)
  }

  async show({ response, params }: HttpContext) {
    const sale = await this.saleService.show(params.id)

    return response.ok(sale)
  }

  async store({ request, response }: HttpContext) {
    const saleData = await request.validateUsing(createSaleValidator)

    const createdSale = await this.saleService.store(saleData)

    return response.created(createdSale)
  }
}
