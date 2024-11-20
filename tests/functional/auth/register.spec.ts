import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import mocksUser from '../../mocks/auth.js'

test.group('Auth register', (group) => {
  group.setup(() => testUtils.db().truncate())

  test('register a valid user', async ({ client, route }) => {
    const response = await client.post(route('auth.register')).json(mocksUser.userRequest)

    response.assertStatus(201)
    response.assertBody(mocksUser.userResponse)
  })

  test('attempt to register with invalid request keys', async ({ client, route }) => {
    const response = await client
      .post(route('auth.register'))
      .json(mocksUser.userRequestInvalidKeys)

    response.assertStatus(422)
    response.assertBody(mocksUser.userResponseInvalidKeys)
  })

  test('attempt to register with invalid request key values', async ({ client, route }) => {
    const response = await client
      .post(route('auth.register'))
      .json(mocksUser.userRequestInvalidKeyValues)

    response.assertStatus(422)
    response.assertBody(mocksUser.userResponseInvalidKeyValues)
  })

  test('attempt register with email already taken', async ({ client, route }) => {
    const response = await client.post(route('auth.register')).json(mocksUser.userRequestEmailTaken)

    response.assertStatus(422)
    response.assertBody(mocksUser.userResponseEmailTaken)
  })

  test('attempt to register with an invalid route', async ({ client }) => {
    const response = await client.post('/not/defined/route').json(mocksUser.userRequestEmailTaken)

    response.assertStatus(404)
    response.assertBody(mocksUser.userRequestInvalidRoute)
  })
})
