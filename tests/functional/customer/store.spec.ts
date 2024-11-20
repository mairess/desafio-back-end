import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '../../mocks/auth.js'
import mockCustomer from '../../mocks/customer.js'

test.group('Customer store', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => testUtils.db().truncate())

  test('create a customer', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client
      .post(route('customer.store'))
      .json(mockCustomer.customerRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockCustomer.customerResponse)
  })

  test('attempt to create an address invalid request customer data', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client
      .post(route('customer.store'))
      .json(mockCustomer.customerInvalidRequestKeys)
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockCustomer.invalidKeysResponse)
  })
})
