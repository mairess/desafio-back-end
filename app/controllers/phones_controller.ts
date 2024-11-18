import NotFoundException from '#exceptions/not_found_exception'
import Customer from '#models/customer'
import Phone from '#models/phone'
import { createPhoneValidator, updatePhoneValidator } from '#validators/phone'
import type { HttpContext } from '@adonisjs/core/http'

export default class PhonesController {
  async store({ request, response, params }: HttpContext) {
    const customer = await Customer.find(params.customerId)
    const phoneData = await request.validateUsing(createPhoneValidator)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId)
    }

    const phone = await customer.related('phones').create(phoneData)

    return response.created(
      phone.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async update({ request, response, params }: HttpContext) {
    const customer = await Customer.find(params.customerId)
    const phone = await Phone.find(params.id)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId)
    }

    if (!phone || phone.id !== customer.id) {
      throw new NotFoundException('Phone', params.id)
    }

    const phoneData = await request.validateUsing(updatePhoneValidator)

    await phone.merge(phoneData).save()

    return response.ok(
      phone.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async destroy({ response, params }: HttpContext) {
    const customer = await Customer.find(params.customerId)
    const phone = await Phone.find(params.id)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId)
    }

    if (!phone || phone.customerId !== customer.id) {
      throw new NotFoundException('Phone', params.id)
    }

    await phone.delete()

    return response.ok({ message: 'Phone deleted successfully!' })
  }
}
