/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/signup', [AuthController, 'register']).as('auth.register').prefix('auth')
router.post('/login', [AuthController, 'login']).as('auth.login').prefix('auth')
router
  .delete('/logout', [AuthController, 'logout'])
  .as('auth.logout')
  .use(middleware.auth())
  .prefix('auth')
router.get('/me', [AuthController, 'me']).as('auth.me').use(middleware.auth()).prefix('auth')
