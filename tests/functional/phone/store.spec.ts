import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import mockAuth from '../../mocks/auth.js'
import mockCustomer from '../../mocks/customer.js'
import mockPhone from '../../mocks/phone.js'
import Customer from '#models/customer'
import Phone from '#models/phone'

test.group('Phone create', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('create a phone', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const customer = await Customer.create(mockCustomer.customerRequest)
    const customerId = customer.id

    const response = await client
      .post(route('phone.store', { customerId }))
      .json(mockPhone.phoneRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockPhone.phoneResponse)
  })

  test('attempt to create a phone with customer not found', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const customerId = 666

    const response = await client
      .post(route('phone.store', { customerId }))
      .json(mockPhone.phoneRequest)
      .loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockCustomer.customerNotFound)
  })

  test('attempt to create a phone with a phone already taken', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const existingCustomer = await Customer.create(mockCustomer.customerRequest)

    await Phone.create({
      ...mockPhone.phoneRequest,
      customerId: existingCustomer.id,
    })

    const anotherCustomer = await Customer.create({
      fullName: 'Juliana de Souza Amaral',
      cpf: '113.120.101-00',
      email: 'juliana2@xample.com',
    })
    const customerId = anotherCustomer.id

    const response = await client
      .post(route('phone.store', { customerId }))
      .json(mockPhone.phoneRequest)
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockPhone.phoneAlreadyTaken)
  })
})
