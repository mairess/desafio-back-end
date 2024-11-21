import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '#tests/mocks/auth'
import timekeeper from 'timekeeper'
import mocksUser from '../mocks/auth.js'

test.group('Auth test', (group) => {
  group.setup(async () => testUtils.db().truncate())
  group.setup(async () => loadUser())
  let user: User

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)
    user = loggedUser
  }

  test('Log user and return token', async ({ client, route }) => {
    const response = await client.post(route('auth.login')).json(mockAuth.userLogin)

    response.assertStatus(200)
    response.assertTextIncludes('token')
  })

  test('attempt to login with invalid request user credentials', async ({ client, route }) => {
    const response = await client
      .post(route('auth.login'))
      .json(mockAuth.loginRequestInvalidCredentials)

    response.assertStatus(400)
    response.assertBody(mockAuth.loginResponseInvalidCredentials)
  })

  test('attempt to login with invalid request user credentials keys', async ({ client, route }) => {
    const response = await client.post(route('auth.login')).json(mockAuth.loginInvalidKeys)

    response.assertStatus(422)
    response.assertBody(mockAuth.loginInvalidKeyValues)
  })

  test('logout the user', async ({ client, route, assert }) => {
    const response = await client
      .delete(route('auth.logout'))
      .json(mockAuth.userLogin)
      .loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'Logged out successfully!')
  })

  test('attempt to logout without been authenticated', async ({ client, route }) => {
    const response = await client.delete(route('auth.logout')).json(mockAuth.userLogin)

    const errorMessage = {
      errors: [{ message: 'Unauthorized access' }],
    }

    response.assertStatus(401)
    response.assertBody(errorMessage)
  })

  test('show whose logged', async ({ client, route, assert }) => {
    const response = await client.get(route('auth.me')).loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().id, '1')
    assert.equal(response.body().fullName, 'Rosa Amarela de Souza')
    assert.equal(response.body().email, 'rosa@mail.com')
    assert.exists(response.body().createdAt)
    assert.exists(response.body().updatedAt)

    timekeeper.reset()
  })

  test('register a valid user', async ({ client, route }) => {
    const response = await client.post(route('auth.register')).json({
      fullName: 'Rosa Vermelha da Silva',
      email: 'rosasilva@mail.com',
      password: 'password123',
    })

    response.assertStatus(201)
    response.assertBody({
      fullName: 'Rosa Vermelha da Silva',
      email: 'rosasilva@mail.com',
      id: 2,
    })
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
