import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '../mocks/auth.js'
import mockAddress from '../mocks/address.js'
import Customer from '#models/customer'
import mockCustomer from '../mocks/customer.js'
import Address from '#models/address'

test.group('Addresses tests', (group) => {
  group.setup(async () => testUtils.db().truncate())
  group.setup(async () => loadUser())
  let user: User
  let customer: Customer

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)
    const existingCustomer = await Customer.create(mockCustomer.customerRequest)

    user = loggedUser
    customer = existingCustomer
  }

  test('create an address', async ({ client, route }) => {
    const customerId = customer.id

    const response = await client
      .post(route('address.store', { customerId }))
      .json(mockAddress.addressRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockAddress.addressResponse)
  })

  test('attempt to create an address with customer not found', async ({ client, route }) => {
    const customerId = 666

    const response = await client
      .post(route('address.store', { customerId }))
      .json(mockAddress.addressRequest)
      .loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockCustomer.customerNotFound)
  })

  test('remove an address', async ({ assert, client, route }) => {
    const id = 1
    const customerId = customer.id

    await client
      .post(route('address.store', { customerId }))
      .json(mockAddress.addressRequest)
      .loginAs(user)

    await Address.create(mockAddress.addressRequest)

    const response = await client.delete(route('address.destroy', { id, customerId })).loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Address deleted successfully!')
  })

  test('attempt to remove an address with customer not found', async ({ client, route }) => {
    const id = 1
    const customerId = 666

    await Address.create(mockAddress.addressRequest)

    const response = await client.delete(route('address.destroy', { id, customerId })).loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockCustomer.customerNotFound)
  })
})
