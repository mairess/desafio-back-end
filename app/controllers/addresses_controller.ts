import NotFoundException from '#exceptions/not_found_exception'
import Address from '#models/address'
import Customer from '#models/customer'
import { createAddressValidator, updateAddressValidator } from '#validators/address'
import type { HttpContext } from '@adonisjs/core/http'

export default class AddressesController {
  async store({ request, response, params }: HttpContext) {
    const addressData = await request.validateUsing(createAddressValidator)
    const customer = await Customer.find(params.customerId)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId.toString())
    }

    const address = await customer.related('address').create(addressData)

    return response.created(
      address.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async update({ request, response, params }: HttpContext) {
    const addressData = await request.validateUsing(updateAddressValidator)

    const customer = await Customer.find(params.customerId)
    const address = await Address.find(params.id)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId.toString())
    }

    if (!address || address.customerId !== customer.id) {
      throw new NotFoundException('Address', params.id)
    }

    await address.merge(addressData).save()

    return response.ok(
      address.serialize({
        fields: {
          omit: ['createdAt', 'updatedAt'],
        },
      })
    )
  }

  async destroy({ response, params }: HttpContext) {
    const address = await Address.find(params.id)
    const customer = await Customer.find(params.customerId)

    if (!customer) {
      throw new NotFoundException('Customer', params.customerId.toString())
    }

    if (!address || address.customerId !== customer.id) {
      throw new NotFoundException('Address', params.id)
    }

    await address.delete()

    return response.ok({ message: 'Address deleted successfully!' })
  }
}
