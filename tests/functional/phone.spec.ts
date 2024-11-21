import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import mockAuth from '../mocks/auth.js'
import mockCustomer from '../mocks/customer.js'
import mockPhone from '../mocks/phone.js'
import Customer from '#models/customer'

test.group('Phone test', (group) => {
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

  test('create a phone', async ({ client, route }) => {
    const customerId = customer.id

    const response = await client
      .post(route('phone.store', { customerId }))
      .json(mockPhone.phoneRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockPhone.phoneResponse)
  })

  test('attempt to create a phone with customer not found', async ({ client, route }) => {
    const customerId = 666

    const response = await client
      .post(route('phone.store', { customerId }))
      .json({ phoneNumber: '07300000001' })
      .loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockCustomer.customerNotFound)
  })

  test('attempt to create a phone with a phone already taken', async ({ client, route }) => {
    const response = await client
      .post(route('phone.store', { customerId: 1 }))
      .json({ phoneNumber: '07400000001' })
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockPhone.phoneAlreadyTaken)
  })

  test('remove a phone', async ({ client, route, assert }) => {
    const response = await client
      .delete(route('phone.destroy', { id: 1, customerId: 1 }))
      .loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Phone deleted successfully!')
  })
})
