import CustomerNotFoundException from '#exceptions/customer_not_found_exception'
import Customer from '#models/customer'
import { createAddressValidator } from '#validators/address'
import type { HttpContext } from '@adonisjs/core/http'

export default class AddressesController {
  async store({ request, response }: HttpContext) {
    const addressData = await request.validateUsing(createAddressValidator)
    const customer = await Customer.find(addressData.customerId)

    if (!customer) {
      throw new CustomerNotFoundException(addressData.customerId.toString())
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

  //   async update({ request, response, params }: HttpContext) {
  //     const customer = await Customer.find(params.customerId)
  //     const phone = await Phone.find(params.id)

  //     if (!customer) {
  //       throw new CustomerNotFoundException(params.customerId)
  //     }

  //     if (!phone || phone.customerId !== customer.id) {
  //       throw new PhoneNotFoundException(params.id)
  //     }

  //     const phoneData = await request.validateUsing(updatePhoneValidator)

  //     await phone.merge(phoneData).save()

  //     return response.ok(
  //       phone.serialize({
  //         fields: {
  //           omit: ['createdAt', 'updatedAt'],
  //         },
  //       })
  //     )
  //   }

  //   async destroy({ response, params }: HttpContext) {
  //     const customer = await Customer.find(params.customerId)
  //     const phone = await Phone.find(params.id)

  //     if (!customer) {
  //       throw new CustomerNotFoundException(params.customerId)
  //     }

  //     if (!phone || phone.customerId !== customer.id) {
  //       throw new PhoneNotFoundException(params.id)
  //     }

  //     await phone.delete()

  //     return response.ok({ message: 'Phone deleted successfully!' })
  //   }
}
