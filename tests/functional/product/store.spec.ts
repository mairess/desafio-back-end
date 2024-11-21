import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mockAuth from '../../mocks/auth.js'
import mockProduct from '../../mocks/product.js'
import User from '#models/user'

test.group('Product store', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('create a product', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client
      .post(route('product.store'))
      .json(mockProduct.productRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockProduct.productResponse)
  })

  test('attempt to create a product with invalid data keys', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client
      .post(route('product.store'))
      .json(mockProduct.productInvalidKeysRequest)
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockProduct.productInvalidKeysResponse)
  })
})
