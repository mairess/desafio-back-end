import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '../../mocks/auth.js'
import mockAddress from '../../mocks/address.js'
import Customer from '#models/customer'

test.group('Addresses remove', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('remove an address', async ({ assert, client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    await Customer.create({
      fullName: 'Cloves Guedes Macedo',
      cpf: '110.100.101-00',
      email: 'macedo@xample.com',
    })

    const id = 1
    const customerId = 1

    await client
      .post(route('address.store', { customerId }))
      .json(mockAddress.addressRequest)
      .loginAs(user)

    const response = await client
      .delete(route('address.destroy', { id, customerId }))
      .json(mockAddress.addressRequest)
      .loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Address deleted successfully!')
  })
})
