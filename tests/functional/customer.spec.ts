import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '../mocks/auth.js'
import mockCustomer from '../mocks/customer.js'

test.group('Customer tests', (group) => {
  group.setup(() => testUtils.db().truncate())
  group.setup(async () => await loadUser())

  let user: User

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)
    user = loggedUser
  }

  test('create a customer', async ({ client, route }) => {
    const response = await client
      .post(route('customer.store'))
      .json(mockCustomer.customerRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockCustomer.customerResponse)
  })

  test('update a customer', async ({ client, route }) => {
    const response = await client
      .patch(route('customer.update', { id: 1 }))
      .json(mockCustomer.customerUpdateRequest)
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody(mockCustomer.customerUpdateResponse)
  })

  test('list customers', async ({ client, route }) => {
    const response = await client.get(route('customer.index')).loginAs(user)

    response.assertStatus(200)
    response.assertBody(mockCustomer.costumerListResponse)
  })

  test('attempt to create an address invalid request customer data', async ({ client, route }) => {
    const response = await client
      .post(route('customer.store'))
      .json(mockCustomer.customerInvalidRequestKeys)
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockCustomer.invalidKeysResponse)
  })

  test('delete a customer', async ({ client, route }) => {
    const response = await client
      .delete(route('customer.destroy', { id: 1 }))
      .json(mockCustomer.customerRequest)
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody({ message: 'Customer deleted successfully!' })
  })
})
