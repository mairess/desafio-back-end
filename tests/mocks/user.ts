const usersListResponse = {
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
      fullName: 'Rosa Amarela de Souza',
      email: 'rosa@mail.com',
      id: 1,
    },
  ],
}

const userUpdateRequest = {
  fullName: 'Gabriel Souza Fernandes',
  email: 'fernandes@mail.com',
}

const userUpdateResponse = {
  fullName: 'Gabriel Souza Fernandes',
  email: 'fernandes@mail.com',
  id: 1,
}

export default {
  usersListResponse,
  userUpdateRequest,
  userUpdateResponse,
}
