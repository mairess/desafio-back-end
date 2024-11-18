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
    router.get('/list', [CustomersController, 'index']).as('customer.index')
    router.get('/details/:id', [CustomersController, 'show']).as('customer.show')
    router.post('/create', [CustomersController, 'store']).as('customer.store')
    router.patch('/update/:id', [CustomersController, 'update']).as('customer.update')
    router.delete('/delete/:id', [CustomersController, 'destroy']).as('customer.destroy')
  })
  .prefix('customers')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/list', [ProductsController, 'index']).as('product.index')
    router.get('/details/:id', [ProductsController, 'show']).as('product.show')
    router.post('/create', [ProductsController, 'store']).as('product.store')
    router.patch('/update/:id', [ProductsController, 'update']).as('product.update')
    router.delete('/delete/:id', [ProductsController, 'destroy']).as('product.destroy')
  })
  .prefix('products')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/create/:customerId', [PhonesController, 'store']).as('phone.store')
    router
      .patch('/update/:id/customer/:customerId', [PhonesController, 'update'])
      .as('phone.update')
    router
      .delete('/delete/:id/customer/:customerId', [PhonesController, 'destroy'])
      .as('phone.destroy')
  })
  .prefix('phones')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/create', [SalesController, 'store']).as('sale.store')
    router.get('/list', [SalesController, 'index']).as('sale.index')
    router.get('/details/:id', [SalesController, 'show']).as('sale.show')
  })
  .prefix('sales')
  .use(middleware.auth())
