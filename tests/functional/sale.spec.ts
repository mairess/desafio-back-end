import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mockAuth from '../mocks/auth.js'
import mockProduct from '../mocks/product.js'
import mockCustomer from '../mocks/customer.js'
import mockSale from '../mocks/sale.js'
import User from '#models/user'
import Product from '#models/product'
import Customer from '#models/customer'

test.group('Sales store', (group) => {
  group.setup(async () => testUtils.db().truncate())
  group.setup(async () => loadUser())
  let user: User

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)

    user = loggedUser
  }

  test('create a sale', async ({ client, route }) => {
    await Product.create(mockProduct.productRequest)
    await Customer.create(mockCustomer.customerRequest)

    const response = await client.post(route('sale.store')).json(mockSale.saleRequest).loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockSale.saleResponse)
  })

  test('attempt to create a sale with not found product', async ({ client, route }) => {
    const response = await client
      .post(route('sale.store'))
      .json(mockSale.saleRequestProductNotFound)
      .loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockSale.saleNotFoundProduct)
  })

  test('attempt to create a sale with not found customer', async ({ client, route }) => {
    const response = await client
      .post(route('sale.store'))
      .json(mockSale.saleRequestCustomerNotFound)
      .loginAs(user)

    response.assertStatus(404)
    response.assertBody(mockSale.saleNotFoundCustomer)
  })
})
