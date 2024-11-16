/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const CustomersController = () => import('#controllers/customers_controller')
const ProductsController = () => import('#controllers/products_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('/signup', [AuthController, 'register']).as('auth.register')
    router.post('/login', [AuthController, 'login']).as('auth.login')
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
    router.get('/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())
  })
  .prefix('auth')

router
  .group(() => {
    router.get('/index', [CustomersController, 'index']).as('customer.index')
    router.get('/show/:id', [CustomersController, 'show']).as('customer.show')
    router.post('/create', [CustomersController, 'store']).as('customer.store')
    router.patch('/update/:id', [CustomersController, 'update']).as('customer.update')
    router.delete('/delete/:id', [CustomersController, 'delete']).as('customer.delete')
  })
  .prefix('customers')

router
  .group(() => {
    router.get('/index', [ProductsController, 'index']).as('product.index')
    router.get('/show/:id', [ProductsController, 'show']).as('product.show')
    router.post('/create', [ProductsController, 'store']).as('product.store')
    router.patch('/update/:id', [ProductsController, 'update']).as('product.update')
    router.delete('/delete/:id', [ProductsController, 'delete']).as('product.delete')
  })
  .prefix('products')
