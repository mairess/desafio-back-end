import AddressService from '#services/address_service'
import { createAddressValidator, updateAddressValidator } from '#validators/address'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AddressesController {
  constructor(protected addressService: AddressService) {}

  async store({ request, response, params }: HttpContext) {
    const addressData = await request.validateUsing(createAddressValidator)

    const address = await this.addressService.store(params.customerId, addressData)

    return response.created(address)
  }

  async update({ request, response, params }: HttpContext) {
    const addressData = await request.validateUsing(updateAddressValidator)

    const address = await this.addressService.update(
      params.customerId,
      params.customerId,
      addressData
    )

    return response.ok(address)
  }

  async destroy({ response, params }: HttpContext) {
    await this.addressService.destroy(params.customerId, params.id)

    return response.ok({ message: 'Address deleted successfully!' })
  }
}
