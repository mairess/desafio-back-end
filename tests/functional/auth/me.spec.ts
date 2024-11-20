import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import mockAuth from '#tests/mocks/auth'

test.group('Auth me', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('example test', async ({ client, route }) => {
    const user = await User.create(mockAuth.userRequest)

    const response = await client.get(route('auth.me')).loginAs(user)

    response.assertStatus(200)
    response.assertBody(mockAuth.me)
  })

  test('attempt to logout without been authenticated', async ({ client, route }) => {
    const response = await client.delete(route('auth.logout')).json(mockAuth.userLogin)

    const errorMessage = {
      errors: [{ message: 'Unauthorized access' }],
    }

    response.assertStatus(401)
    response.assertBody(errorMessage)
  })
})
