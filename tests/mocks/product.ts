const productRequest = {
  name: 'Control car toy',
  description: 'Very fast car fo your kids',
  price: 5000.58,
  stock: 6,
}

const productResponse = {
  name: 'Control car toy',
  description: 'Very fast car fo your kids',
  price: 5000.58,
  stock: 6,
  id: 1,
}

const productInvalidKeysRequest = {
  a: 'Control car toy',
  b: 'Very fast car fo your kids',
  c: 5000.58,
  d: 6,
}

const productInvalidKeysResponse = {
  errors: [
    {
      message: 'The name field must be defined',
      rule: 'required',
      field: 'name',
    },
    {
      message: 'The description field must be defined',
      rule: 'required',
      field: 'description',
    },
    {
      message: 'The price field must be defined',
      rule: 'required',
      field: 'price',
    },
    {
      message: 'The stock field must be defined',
      rule: 'required',
      field: 'stock',
    },
  ],
}

const productListResponse = {
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
      name: 'Control car toy',
      description: 'Very fast car fo your kids',
      price: '5000.58',
      id: 1,
    },
  ],
}

export default {
  productRequest,
  productResponse,
  productInvalidKeysRequest,
  productInvalidKeysResponse,
  productListResponse,
}
