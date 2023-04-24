# Banking

This is a nodejs app that performs simple banking operations using data from database. The Banking node app library allows you to create, read, update users and does payments with the Banked API. All of the methods return a promise (sourced from the axios client).
#### Dependencies
- Using **axios** to make http calls to SimpleRETS api
- **dotenv** to read environment variables from **.env** file
- **winston** for logging

###### **config.js** reads the .env file and returns a js object that can be used easily in the project.

### How To Run
Firstly, Create **.env** file in the root directory and copy/paste content from example.env into .env

#### Install packages & run code
```
npm install && npm start
```

### Authentication
``POST - /user/login``
#### Request body
```
{
    "email": "admin@gmail.com",
    "password": "password"
}
```
#### Response body
```
{
    "message": "Login successful",
    "token": "YWRtaW5AZ21haWwuY29tOnBhc3N3b3Jk"
}
```
### User Operations
#### ADD User
###### API call to create user
``POST - /user``
#### Request body
```
{
"firstname": "Naveena",
"lastname" : "Pachava",
"email" : "admin@gmail.com",
"address1" : "108 blvd",
"address2" : "luna rd",
"city" : "phenoix",
"state": "Arizona",
"zipcode":"345678",
"password":"password"
}
```
#### Response body
```
{
    "id": "812012cb-6191-4353-b3d2-8626d1628b5c",
    "firstname": "Naveena",
    "lastname": "Pachava",
    "email": "admin@gmail.com",
    "address1": "108 blvd",
    "address2": "luna rd",
    "city": "phenoix",
    "state": "Arizona",
    "zipcode": 345678,
    "balance": 0,
    "createddate": "2023-04-24T04:34:53.000Z",
    "updateddate": "2023-04-24T04:34:53.000Z",
    "password": "password"
}
```

#### SEARCH User
###### API call to search user by name 
``GET - /user/name/naveena``
###### Basic token is essential to get user details
###### Headers
``Authorization: Basic YWRtaW5AZ21haWwuY29tOnBhc3N3b3Jk``
#### Response body
```
[
    {
        "id": "2",
        "firstname": "naveena",
        "lastname": "P",
        "email": "nav@gmail.com",
        "address1": "aspin",
        "address2": "null",
        "city": "dallas",
        "state": "TX",
        "zipcode": 76224
    },
    {
        "id": "812012cb-6191-4353-b3d2-8626d1628b5c",
        "firstname": "Naveena",
        "lastname": "Pachava",
        "email": "admin@gmail.com",
        "address1": "108 blvd",
        "address2": "luna rd",
        "city": "phenoix",
        "state": "Arizona",
        "zipcode": 345678
    }
]
```

### Transactional Operations
#### Deposit
###### API call to deposit amount in user account
``PATCH - /transaction/deposit``
###### Basic token is essential to get user details
###### Headers
``Authorization: Basic YWRtaW5AZ21haWwuY29tOnBhc3N3b3Jk``
#### Request body
```
{
    "amount":  170
}
```
#### Response body
```
{
    "message": "successfully deposited & user ID: 1711ca8c-9ece-482e-92a1-a8cc448e45a9 with current balance 754535"
}
```

#### Transfer
###### API call to transfer amount to an other user
``PATCH - /transaction/transfer``
###### Basic token is essential to get user details
###### Headers
``Authorization: Basic YWRtaW5AZ21haWwuY29tOnBhc3N3b3Jk``
#### Request body
```
{
    "amount": 100,
    "id":"f0d20dd2-db42-4d58-8956-bc5fffdbbe57"
}
```
#### Response body
```
{
    "message": "100 successfully debited from kavya with ID:1711ca8c-9ece-482e-92a1-a8cc448e45a9 to sunder with ID:f0d20dd2-db42-4d58-8956-bc5fffdbbe57 & CURRENT BALANCE:754415"
}
```
