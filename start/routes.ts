/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AddressesController = () => import('#controllers/addresses_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const CustomersController = () => import('#controllers/customers_controller')
const ProductsController = () => import('#controllers/products_controller')
const PhonesController = () => import('#controllers/phones_controller')
const SalesController = () => import('#controllers/sales_controller')

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
    router.get('/', [UsersController, 'index']).as('user.index')
    router.patch('/:id', [UsersController, 'update']).as('user.update')
    router.delete('/:id', [UsersController, 'destroy']).as('user.destroy')
  })
  .prefix('users')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/customers/:customerId', [AddressesController, 'store']).as('address.store')
    router.patch('/:id/customers/:customerId', [AddressesController, 'update']).as('address.update')
    router
      .delete('/:id/customers/:customerId', [AddressesController, 'destroy'])
      .as('address.destroy')
  })
  .prefix('addresses')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [CustomersController, 'index']).as('customer.index')
    router.get('/:id', [CustomersController, 'show']).as('customer.show')
    router.post('/', [CustomersController, 'store']).as('customer.store')
    router.patch('/:id', [CustomersController, 'update']).as('customer.update')
    router.delete('/:id', [CustomersController, 'destroy']).as('customer.destroy')
  })
  .prefix('customers')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('product.index')
    router.get('/:id', [ProductsController, 'show']).as('product.show')
    router.post('/', [ProductsController, 'store']).as('product.store')
    router.patch('/:id', [ProductsController, 'update']).as('product.update')
    router.delete('/:id', [ProductsController, 'destroy']).as('product.destroy')
  })
  .prefix('products')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/customers/:customerId', [PhonesController, 'store']).as('phone.store')
    router.patch('/:id/customers/:customerId', [PhonesController, 'update']).as('phone.update')
    router.delete('/:id/customers/:customerId', [PhonesController, 'destroy']).as('phone.destroy')
  })
  .prefix('phones')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [SalesController, 'store']).as('sale.store')
    router.get('/', [SalesController, 'index']).as('sale.index')
    router.get('/:id', [SalesController, 'show']).as('sale.show')
  })
  .prefix('sales')
  .use(middleware.auth())
