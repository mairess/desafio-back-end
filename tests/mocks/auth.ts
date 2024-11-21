const userRequest = {
  fullName: 'Rosa Amarela de Souza',
  email: 'rosa@mail.com',
  password: 'password123',
}

const userResponse = {
  fullName: 'Rosa Amarela de Souza',
  email: 'rosa@mail.com',
  id: 1,
}

const userLogin = {
  email: 'rosa@mail.com',
  password: 'password123',
}

const loginInvalidKeys = {
  xx: 'rosa@mail.com',
  zz: 'password123',
}

const loginInvalidKeyValues = {
  errors: [
    {
      message: 'The email field must be defined',
      rule: 'required',
      field: 'email',
    },
    {
      message: 'The password field must be defined',
      rule: 'required',
      field: 'password',
    },
  ],
}

const loginRequestInvalidCredentials = {
  email: 'rosaxxx@mail.com',
  password: 'xxxpassword123',
}

const loginResponseInvalidCredentials = {
  errors: [
    {
      message: 'Invalid user credentials',
    },
  ],
}

const userRequestInvalidKeys = {
  x: 'Rosa Amarela de Souza',
  y: 'rosa@mail.com',
  z: 'password123',
}

const userResponseInvalidKeys = {
  errors: [
    {
      message: 'The fullName field must be defined',
      rule: 'required',
      field: 'fullName',
    },
    {
      message: 'The email field must be defined',
      rule: 'required',
      field: 'email',
    },
    {
      message: 'The password field must be defined',
      rule: 'required',
      field: 'password',
    },
  ],
}

const userRequestInvalidKeyValues = {
  fullName: 'Ro',
  email: 'rosamail.com',
  password: 'pas',
}

const userResponseInvalidKeyValues = {
  errors: [
    {
      message: 'The fullName field must have at least 3 characters',
      rule: 'minLength',
      field: 'fullName',
      meta: {
        min: 3,
      },
    },
    {
      message: 'The email field must be a valid email address',
      rule: 'email',
      field: 'email',
    },
    {
      message: 'The password field must have at least 8 characters',
      rule: 'minLength',
      field: 'password',
      meta: {
        min: 8,
      },
    },
  ],
}

const userRequestEmailTaken = {
  fullName: 'Tulipa Vermelha de Souza',
  email: 'rosa@mail.com',
  password: 'password123',
}

const userResponseEmailTaken = {
  errors: [
    {
      message: 'The email has already been taken',
      rule: 'database.unique',
      field: 'email',
    },
  ],
}

const userRequestInvalidRoute = {
  errors: [
    {
      message: 'The requested resource /not/defined/route was not found',
      rule: 'route.notFound',
      field: 'route',
    },
  ],
}

export default {
  userRequest,
  userResponse,
  userLogin,
  loginInvalidKeys,
  loginInvalidKeyValues,
  loginRequestInvalidCredentials,
  loginResponseInvalidCredentials,
  userRequestInvalidKeys,
  userResponseInvalidKeys,
  userRequestInvalidKeyValues,
  userResponseInvalidKeyValues,
  userRequestEmailTaken,
  userResponseEmailTaken,
  userRequestInvalidRoute,
}
