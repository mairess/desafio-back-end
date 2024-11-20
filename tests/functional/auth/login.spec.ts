import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '#tests/mocks/auth'

test.group('Auth login', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('Log user and return token', async ({ client, route }) => {
    await User.create(mockAuth.userRequest)

    const response = await client.post(route('auth.login')).json(mockAuth.userLogin)

    response.assertStatus(200)
    response.assertTextIncludes('token')
  })

  test('attempt to login with invalid request user credentials', async ({ client, route }) => {
    await User.create(mockAuth.userRequest)

    const response = await client
      .post(route('auth.login'))
      .json(mockAuth.loginRequestInvalidCredentials)

    response.assertStatus(400)
    response.assertBody(mockAuth.loginResponseInvalidCredentials)
  })

  test('attempt to login with invalid request user credentials keys', async ({ client, route }) => {
    await User.create(mockAuth.userRequest)

    const response = await client.post(route('auth.login')).json(mockAuth.loginInvalidKeys)

    response.assertStatus(422)
    response.assertBody(mockAuth.loginInvalidKeyValues)
  })
})
