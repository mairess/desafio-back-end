const phoneRequest = {
  phoneNumber: '07400000001',
}

const phoneResponse = {
  phoneNumber: '07400000001',
  id: 1,
}

const phoneAlreadyTaken = {
  errors: [
    {
      message: 'The phoneNumber has already been taken',
      rule: 'database.unique',
      field: 'phoneNumber',
    },
  ],
}

export default {
  phoneRequest,
  phoneResponse,
  phoneAlreadyTaken,
}
