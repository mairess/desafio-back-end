import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import mockAuth from '#tests/mocks/auth'
import timekeeper from 'timekeeper'
import { DateTime } from 'luxon'

test.group('Auth me', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('show whose logged', async ({ client, route }) => {
    const now = DateTime.utc(2024, 11, 20, 19, 30)
    timekeeper.freeze(now.toJSDate())

    const dateFirstPart = now.toUTC().toISO()?.split('.')[0]
    const formattedDate = dateFirstPart + '.000+00:00'

    const user = await User.create(mockAuth.userRequest)

    const response = await client.get(route('auth.me')).loginAs(user)

    const expectedResponse = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    }

    response.assertStatus(200)
    response.assertBody(expectedResponse)

    timekeeper.reset()
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
