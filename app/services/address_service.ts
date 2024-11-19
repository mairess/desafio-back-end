import { AddressDataType } from '../types/address.js'
import Customer from '#models/customer'
import NotFoundException from '#exceptions/not_found_exception'
import Address from '#models/address'

export default class AddressService {
  async store(customerId: number, addressData: AddressDataType) {
    const customer = await Customer.find(customerId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    const address = await customer.related('addresses').create(addressData)

    return address.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async update(customerId: number, addressId: number, addressData: AddressDataType) {
    const customer = await Customer.find(customerId)
    const address = await Address.find(addressId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    if (!address || address.customerId !== customer.id)
      throw new NotFoundException('Address', addressId)

    await address.merge(addressData).save()

    return address.serialize({ fields: { omit: ['createdAt', 'updatedAt'] } })
  }

  async destroy(customerId: number, addressId: number) {
    const customer = await Customer.find(customerId)
    const address = await Address.find(addressId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    if (!address || address.customerId !== customer.id)
      throw new NotFoundException('Address', addressId)

    await address.delete()
  }
}
