const saleRequest = {
  customerId: 1,
  productId: 1,
  quantity: 1,
}

const saleRequestProductNotFound = {
  customerId: 1,
  productId: 666,
  quantity: 1,
}

const saleRequestCustomerNotFound = {
  customerId: 666,
  productId: 1,
  quantity: 1,
}

const saleResponse = {
  customerId: 1,
  productId: 1,
  quantity: 1,
  unitPrice: '5000.58',
  totalPrice: 5000.58,
  id: 1,
}

const saleNotFoundProduct = {
  errors: [
    {
      message: 'Product not found with id 666',
      rule: 'product.notFound',
      field: 'productId',
    },
  ],
}

const saleNotFoundCustomer = {
  errors: [
    {
      message: 'Customer not found with id 666',
      rule: 'customer.notFound',
      field: 'customerId',
    },
  ],
}

export default {
  saleRequest,
  saleRequestProductNotFound,
  saleRequestCustomerNotFound,
  saleResponse,
  saleNotFoundProduct,
  saleNotFoundCustomer,
}
