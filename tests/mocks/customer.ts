const customerRequest = {
  fullName: 'Juliana de Souza Amaral',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
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
  customerNotFound,
}
