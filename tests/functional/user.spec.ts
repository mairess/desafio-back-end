import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import mockAuth from '#tests/mocks/auth'
import mocksUser from '../mocks/user.js'

test.group('Auth test', (group) => {
  group.setup(async () => testUtils.db().truncate())
  group.setup(async () => loadUser())
  let user: User

  const loadUser = async () => {
    const loggedUser = await User.create(mockAuth.userRequest)
    user = loggedUser
  }

  test('list users', async ({ client, route }) => {
    const response = await client.get(route('user.index')).loginAs(user)

    response.assertStatus(200)
    response.assertBody(mocksUser.usersListResponse)
  })

  test('update user', async ({ client, route }) => {
    const response = await client
      .patch(route('user.update', { id: 1 }))
      .json(mocksUser.userUpdateRequest)
      .loginAs(user)

    response.assertStatus(200)
    response.assertBody(mocksUser.userUpdateResponse)
  })

  test('delete user', async ({ client, route, assert }) => {
    const response = await client.delete(route('user.destroy', { id: 1 })).loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().message, 'User deleted successfully!')
  })
})
