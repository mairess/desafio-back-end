const customerRequest = {
  fullName: 'Juliana de Souza Amaral',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
}

const customerInvalidRequestKeys = {
  x: 'Juliana de Souza Amaral',
  y: '110.100.101-00',
  z: 'juliana@xample.com',
}

const invalidKeysResponse = {
  errors: [
    {
      message: 'The fullName field must be defined',
      rule: 'required',
      field: 'fullName',
    },
    {
      message: 'The cpf field must be defined',
      rule: 'required',
      field: 'cpf',
    },
    {
      message: 'The email field must be defined',
      rule: 'required',
      field: 'email',
    },
  ],
}

const customerResponse = {
  fullName: 'Juliana de Souza Amaral',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
  id: 1,
}

const customerNotFound = {
  errors: [
    {
      message: 'Customer not found with id 666',
      rule: 'customer.notFound',
      field: 'customerId',
    },
  ],
}

export default {
  customerRequest,
  customerInvalidRequestKeys,
  customerResponse,
  customerNotFound,
  invalidKeysResponse,
}
