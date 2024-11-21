# Back-end Challenge from [BeMobile](https://www.linkedin.com/company/betalenttech/)

## Challenge

This project implements a RESTful API to manage users, clients, products, and sales. The API allows authenticated users to perform CRUD operations on these entities and stores data in a relational database.

# 🚀 Installation and Setup

### Prerequisites

Make sure you have [Docker](https://www.docker.com/get-started/) installed on your machine:

Also set up the environment variables:

```properties

TZ=UTC
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=MSCLKHNZ5o35eMhTIAJRJ-IlFn4Xz-q-
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=adonis_db

```

And the test environment variables `.env.test`:

```properties

TZ=UTC
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=mSCOaHNF5o35eMhTIAJRJ-AfPb2Rw-q-
NODE_ENV=test
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=test_db

```

# Run with Docker

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/desafio-back-end.git

cd desafio-back-end
```

2. Run application:

```BASH
docker compose up -d
```

5. Run tests:

```BASH
npm test
```

# Run locally

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/desafio-back-end.git

cd desafio-back-end
```

2. Install dependencies:

```BASH
npm install
```

3. Run database:

```BASH

docker compose up -d database

```

4. Run project:

```BASH
# before run the project, you have to await for database health check

npm run dev
```

5. Run tests:

```BASH
npm test
```

# 📚 API Documentation

<details>


<summary>Authentication</summary>

### POST /auth/signup

#### Request:
```json
{
  "fullName": "Marcos Oliveira de Cardoso",
  "email": "marcos@mail.com",
  "password": "password123"
}
```

#### Response:
```json
{
  "fullName": "Marcos Oliveira de Cardoso",
  "email": "marcos@mail.com",
  "id": 4
}
```

### POST /auth/login

#### Request:
```json
{
  "email": "juliana@mail.com",
  "password": "12345678"
}
```

#### Response:
```json
{
	"token": "oat_NA.TmFERV9JT1ZOZ3dTdFVpTkJXY1dhLWFpY2hxMWxhTVRzUlFkRUR2NDUyMzY0MzAwMw"
}
```

### GET /auth/me

#### Response:
```json
{
	"id": 2,
	"fullName": "Juliana Silva",
	"email": "juliana@mail.com",
	"createdAt": "2024-11-21T22:29:39.000+00:00",
	"updatedAt": "2024-11-21T22:29:39.000+00:00"
}
```

### DELETE /auth/me

#### Response:
```json
{
	"message": "Logged out successfully!"
}
```

</details>

<details>

<summary>Customers</summary>

## Customers

### GET /customers?page=1&limit=5

#### Response:
```json
{
	"meta": {
		"total": 66,
		"perPage": 5,
		"currentPage": 1,
		"lastPage": 14,
		"firstPage": 1,
		"firstPageUrl": "/?page=1",
		"lastPageUrl": "/?page=14",
		"nextPageUrl": "/?page=2",
		"previousPageUrl": null
	},
	"data": [
		{
			"id": 1,
			"fullName": "Jão Cabral",
			"cpf": "00011122233",
			"email": "cabral@mail.com"
		},
		{
			"id": 2,
			"fullName": "Juliano Marques de Souza",
			"cpf": "11122222222",
			"email": "maires@mail.com"
		},
		{
			"id": 3,
			"fullName": "Pedro Souza",
			"cpf": "98765432101",
			"email": "pedro.souza@mail.com"
		},
		{
			"id": 4,
			"fullName": "Ana Costa",
			"cpf": "10293847562",
			"email": "ana.costa@mail.com"
		},
		{
			"id": 5,
			"fullName": "Lucas Pereira",
			"cpf": "56473829101",
			"email": "lucas.pereira@mail.com"
		}
	]
}
```

### GET /customers/2?year=2024&month=11

#### Response:
```json
{
	"id": 2,
	"fullName": "Maires Rocha de Souza",
	"cpf": "11122222222",
	"email": "maires@mail.com",
	"createdAt": "2024-11-21T22:29:39.000+00:00",
	"updatedAt": "2024-11-21T22:34:13.000+00:00",
	"addresses": [
		{
			"id": 2,
			"street": "Rua das Laranjeiras",
			"number": "101",
			"neighborhood": "Laranjeiras",
			"city": "Rio de Janeiro",
			"state": "RJ",
			"zipCode": "02000-001",
			"country": "Brasil",
			"createdAt": "2024-11-21T22:29:39.000+00:00",
			"updatedAt": "2024-11-21T22:29:39.000+00:00"
		}
	],
	"phones": [
		{
			"id": 2,
			"phoneNumber": "11900000002",
			"createdAt": "2024-11-21T22:29:39.000+00:00",
			"updatedAt": "2024-11-21T22:29:39.000+00:00"
		}
	],
	"sales": [
		{
			"id": 6,
			"quantity": 1,
			"unitPrice": "150.00",
			"totalPrice": "150.00",
			"createdAt": "2024-11-21T22:29:39.000+00:00",
			"product": {
				"id": 6,
				"name": "Product 6",
				"description": "Descrição do produto 6",
				"price": "150.00"
			}
		},
		{
			"id": 7,
			"quantity": 6,
			"unitPrice": "25.00",
			"totalPrice": "150.00",
			"createdAt": "2024-11-21T22:29:39.000+00:00",
			"product": {
				"id": 7,
				"name": "Product 7",
				"description": "Descrição do produto 7",
				"price": "25.00"
			}
		},
		{
			"id": 8,
			"quantity": 3,
			"unitPrice": "75.00",
			"totalPrice": "225.00",
			"createdAt": "2024-11-21T22:29:39.000+00:00",
			"product": {
				"id": 8,
				"name": "Product 8",
				"description": "Descrição do produto 8",
				"price": "75.00"
			}
		}
	]
}
```

### POST /customers

#### Request:
```json
{
	"fullName": "Maires Souza",
	"cpf": "120.100.101-00",
	"email": "euaa@xample.com"
}
```

#### Response:
```json
{
	"fullName": "Maires Souza",
	"cpf": "120.100.101-00",
	"email": "euaa@xample.com",
	"id": 67
}
```

### PATCH /customers/2

#### Request:
```json
{
	"fullName": "Maires Rocha de Souza",
	"cpf": "11122222222",
	"email": "maires@mail.com"
}
```

#### Response:
```json
{
	"id": 2,
	"fullName": "Maires Rocha de Souza",
	"cpf": "11122222222",
	"email": "maires@mail.com"
}
```

### DELETE /customers/2

#### Response:
```json
{
	"message": "Customer deleted successfully!"
}
```

</details>

<details>

<summary>Products</summary>

### GET /products?page=1&limit=15

#### Response:
```json
{
	"meta": {
		"total": 15,
		"perPage": 5,
		"currentPage": 1,
		"lastPage": 3,
		"firstPage": 1,
		"firstPageUrl": "/?page=1",
		"lastPageUrl": "/?page=3",
		"nextPageUrl": "/?page=2",
		"previousPageUrl": null
	},
	"data": [
		{
			"id": 1,
			"name": "Product 1",
			"description": "Descrição do produto 1",
			"price": "100.00"
		},
		{
			"id": 10,
			"name": "Product 10",
			"description": "Descrição do produto 10",
			"price": "40.00"
		},
		{
			"id": 11,
			"name": "Product 11",
			"description": "Descrição do produto 11",
			"price": "90.00"
		},
		{
			"id": 12,
			"name": "Product 12",
			"description": "Descrição do produto 12",
			"price": "120.00"
		},
		{
			"id": 13,
			"name": "Product 13",
			"description": "Descrição do produto 13",
			"price": "180.00"
		}
	]
}
```

### GET /products

#### Response:
```json
{
	"id": 15,
	"name": "Product 15",
	"description": "Descrição do produto 15",
	"price": "55.00",
	"stock": 25,
	"createdAt": "2024-11-21T22:29:39.000+00:00",
	"updatedAt": "2024-11-21T22:29:39.000+00:00",
	"deletedAt": null
}
```

### POST /products

#### Request:
```json
{
  "name": "Super Blender",
  "description": "High-performance blender for making smoothies, soups, and more.",
  "price": 299.99,
  "stock": 15
}
```

#### Response:
```json
{
	"name": "Super Blender",
	"description": "High-performance blender for making smoothies, soups, and more.",
	"price": 299.99,
	"stock": 15,
	"id": 16
}
```

### PATCH /products/16

#### Request:
```json
{
	"name": "Bicycle",
	"description": "A nice bicycle",
	"price": 450,
	"stock": 80
}
```

#### Response:
```json
{
	"id": 16,
	"name": "Bicycle",
	"description": "A nice bicycle",
	"price": 450,
	"stock": 80
}
```

### DELETE /products/16

#### Response:
```json
{
	"message": "Product deleted successfully!"
}
```

</details>

<details>

<summary>Sales</summary>

### GET /sales?page=1&limit=2

#### Response:
```json
{
	"meta": {
		"total": 57,
		"perPage": 2,
		"currentPage": 1,
		"lastPage": 29,
		"firstPage": 1,
		"firstPageUrl": "/?page=1",
		"lastPageUrl": "/?page=29",
		"nextPageUrl": "/?page=2",
		"previousPageUrl": null
	},
	"data": [
		{
			"id": 1,
			"customerId": 1,
			"productId": 1,
			"quantity": 2,
			"unitPrice": "100.00",
			"totalPrice": "200.00",
			"createdAt": "2024-11-21T22:29:39.000+00:00"
		},
		{
			"id": 2,
			"customerId": 1,
			"productId": 2,
			"quantity": 3,
			"unitPrice": "50.00",
			"totalPrice": "150.00",
			"createdAt": "2024-11-21T22:29:39.000+00:00"
		}
	]
}
```

### GET /sales/57

#### Response:
```json
{
	"id": 57,
	"quantity": 2,
	"unitPrice": "120.00",
	"totalPrice": "240.00",
	"createdAt": "2024-11-21T22:29:39.000+00:00",
	"updatedAt": "2024-11-21T22:29:39.000+00:00",
	"customer": {
		"id": 21,
		"fullName": "Renato Souza",
		"cpf": "45678902303",
		"email": "renato.souza@mail.com"
	},
	"product": {
		"id": 12,
		"name": "Product 12",
		"description": "Descrição do produto 12",
		"price": "120.00",
		"stock": 30
	}
}
```

### POST /sales

#### Request:
```json
{
	"customerId": 66,
	"productId": 11,
	"quantity": 1
}
```

#### Response:
```json
{
	"customerId": 66,
	"productId": 11,
	"quantity": 1,
	"unitPrice": "90.00",
	"totalPrice": 90,
	"id": 58
}
```

</details>

<details>

<summary>Phones</summary>

### POST /phones/customers/1

#### Request:
```json
{
	"phoneNumber": "07401000001"
}
```

#### Response:
```json
{
	"phoneNumber": "07401000001",
	"id": 66
}
```

### PATCH /phones/66/customers/1

#### Request:
```json
{
	"phoneNumber": "00000035222"
}
```

#### Response:
```json
{
	"id": 66,
	"customerId": 1,
	"phoneNumber": "00000035222"
}
```

### DELETE /phones/1

#### Response:
```json
{
	"message": "Phone deleted successfully!"
}
```

</details>

<details>

<summary>USers</summary>

### GET /users

#### Response:
```json
{
	"meta": {
		"total": 3,
		"perPage": 50,
		"currentPage": 1,
		"lastPage": 1,
		"firstPage": 1,
		"firstPageUrl": "/?page=1",
		"lastPageUrl": "/?page=1",
		"nextPageUrl": null,
		"previousPageUrl": null
	},
	"data": [
		{
			"id": 1,
			"fullName": "Mirosmar Gleidson",
			"email": "miro@mail.com"
		},
		{
			"id": 2,
			"fullName": "Juliana Silva",
			"email": "juliana@mail.com"
		},
		{
			"id": 3,
			"fullName": "Maires Rocha de Souza",
			"email": "maires@mail.com"
		}
	]
}
```

### PATCH /users/1

#### Request:
```json
{
	"fullName": "Mirosmar Gleidson de Souza",
	"email": "mirosouza@mail.com"
}
```

#### Response:
```json
{
	"id": 1,
	"fullName": "Mirosmar Gleidson de Souza",
	"email": "mirosouza@mail.com"
}
```

### DELETE /users/1

#### Response:
```json
{
	"message": "User deleted successfully!"
}
```

</details>

<details>

<summary>Addresses</summary>

### POST /addresses/customers/1

#### Request:
```json
{
	"street": "Green Flowers",
	"number": 39,
	"neighborhood": "Garden",
	"city": "Rio de Janeiro",
	"state": "RJ",
	"zipCode": "46470000",
	"country": "Brasil"
}
```

#### Response:
```json
{
	"street": "Green Flowers",
	"number": 39,
	"neighborhood": "Garden",
	"city": "Rio de Janeiro",
	"state": "RJ",
	"zipCode": "46470000",
	"country": "Brasil",
	"customerId": 1,
	"id": 66
}
```

### PATCH /addresses/1/customers/1

#### Request:
```json
{
	"street": "oi",
	"number": 222,
	"neighborhood": "oi",
	"city": "oi",
	"state": "PI",
	"zipCode": "46470000",
	"country": "Brasil meu país amado"
}
```

#### Response:
```json
{
	"id": 1,
	"customerId": 1,
	"street": "oi",
	"number": 222,
	"neighborhood": "oi",
	"city": "oi",
	"state": "PP",
	"zipCode": "46470000",
	"country": "Brasil meu país amado"
}
```

### DELETE /addresses/1/customers/1

#### Response:
```json
{
	"message": "Address deleted successfully!"
}
```
</details>

# 🛠 Technologies Used

- **AdonisJS**: Framework for Node.js.

- **MySQL**: Relational database.

- **JWT**: For authentication.

- **Node.js**: Back-end runtime environment.