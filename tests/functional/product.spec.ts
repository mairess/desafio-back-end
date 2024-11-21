import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mockAuth from '../mocks/auth.js'
import mockProduct from '../mocks/product.js'
import User from '#models/user'

test.group('Product tests', (group) => {
  group.setup(async () => testUtils.db().truncate())
  group.setup(async () => loadUser())
  let user: User

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)

    user = loggedUser
  }

  test('create a product', async ({ client, route }) => {
    const response = await client
      .post(route('product.store'))
      .json(mockProduct.productRequest)
      .loginAs(user)

    response.assertStatus(201)
    response.assertBody(mockProduct.productResponse)
  })

  test('list products', async ({ client, route }) => {
    const response = await client.get(route('product.index')).loginAs(user)

    response.assertStatus(200)
    response.assertBody(mockProduct.productListResponse)
  })

  test('attempt to create a product with invalid data keys', async ({ client, route }) => {
    const response = await client
      .post(route('product.store'))
      .json(mockProduct.productInvalidKeysRequest)
      .loginAs(user)

    response.assertStatus(422)
    response.assertBody(mockProduct.productInvalidKeysResponse)
  })

  test('remove a product', async ({ client, route, assert }) => {
    const response = await client.delete(route('product.destroy', { id: 1 })).loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Product deleted successfully!')
  })
})
