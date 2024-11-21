const customerRequest = {
  fullName: 'Juliana de Souza Amaral',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
}

const customerUpdateRequest = {
  fullName: 'Juliana Santos Braga Vieira de Sá',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
}

const customerUpdateResponse = {
  fullName: 'Juliana Santos Braga Vieira de Sá',
  cpf: '110.100.101-00',
  email: 'juliana@xample.com',
  id: 1,
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

const costumerListResponse = {
  meta: {
    total: 1,
    perPage: 50,
    currentPage: 1,
    lastPage: 1,
    firstPage: 1,
    firstPageUrl: '/?page=1',
    lastPageUrl: '/?page=1',
    nextPageUrl: null,
    previousPageUrl: null,
  },
  data: [
    {
      cpf: '110.100.101-00',
      email: 'juliana@xample.com',
      fullName: 'Juliana Santos Braga Vieira de Sá',
      id: 1,
    },
  ],
}

export default {
  customerRequest,
  customerUpdateRequest,
  customerUpdateResponse,
  customerInvalidRequestKeys,
  customerResponse,
  customerNotFound,
  invalidKeysResponse,
  costumerListResponse,
}
