import PhoneService from '#services/phone_service'
import { createPhoneValidator, updatePhoneValidator } from '#validators/phone'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
@inject()
export default class PhonesController {
  constructor(protected phoneService: PhoneService) {}

  async store({ request, response, params }: HttpContext) {
    const phoneData = await request.validateUsing(createPhoneValidator)

    const phone = await this.phoneService.store(params.customerId, phoneData)

    return response.created(phone)
  }

  async update({ request, response, params }: HttpContext) {
    const phoneData = await request.validateUsing(updatePhoneValidator)

    const phone = await this.phoneService.update(params.id, params.customerId, phoneData)

    return response.ok(phone)
  }

  async destroy({ response, params }: HttpContext) {
    await this.phoneService.destroy(params.id, params.customerId)

    return response.ok({ message: 'Phone deleted successfully!' })
  }
}
