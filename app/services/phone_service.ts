import NotFoundException from '#exceptions/not_found_exception'
import Customer from '#models/customer'
import Phone from '#models/phone'
import { PhoneDataType } from '../types/phone.js'

export default class PhoneService {
  async store(customerId: number, phoneData: PhoneDataType) {
    const customer = await Customer.find(customerId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    const phone = await customer.related('phones').create(phoneData)

    return phone.serialize({
      fields: ['id', 'phoneNumber'],
    })
  }

  async update(phoneId: number, customerId: number, phoneData: PhoneDataType) {
    const customer = await Customer.find(customerId)
    const phone = await Phone.find(phoneId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    if (!phone || phone.customerId !== customer.id) throw new NotFoundException('Phone', phoneId)

    await phone.merge(phoneData).save()

    return phone
  }

  async destroy(phoneId: number, customerId: number) {
    const customer = await Customer.find(customerId)
    const phone = await Phone.find(phoneId)

    if (!customer) throw new NotFoundException('Customer', customerId)

    if (!phone || phone.customerId !== customer.id) throw new NotFoundException('Phone', phoneId)

    await phone.delete()
  }
}
