import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '#tests/mocks/auth'

test.group('Auth logout', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('Logout the user', async ({ client, route, assert }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client
      .delete(route('auth.logout'))
      .json(mockAuth.userLogin)
      .loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Logged out successfully!')
  })

  test('attempt to logout without been authenticated', async ({ client, route, assert }) => {
    const response = await client.delete(route('auth.logout')).json(mockAuth.userLogin)

    const errorMessage = {
      errors: [{ message: 'Unauthorized access' }],
    }

    response.assertStatus(401)
    response.assertBody(errorMessage)
  })
})
