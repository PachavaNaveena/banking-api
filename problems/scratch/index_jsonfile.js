
const userOperations = require('../../mysql/services/user.js')
const transactionOperations = require('../../mysql/services/transaction.js')

//--------------------------------USER OPERATIONS----------------------
//-----ADD USER--------
// userOperations.addUser({
//     id: '114',
//     firstname: 'sarada',
//     lastname: 'verapaneni',
//     email: 'a@',
//     address1: 'kanigiri',
//     address2: null,
//     city: 'ongole',
//     state: 'AP',
//     zipcode: 523002,
//     balance: 1000,
//     createddate: new Date().toJSON().slice(0,18),
//     updateddate: new Date().toJSON().slice(0,18)
// }).then(user => console.log(user));


//-------UPDATE USER--------

// userOperations.getUser(7).then( result => console.log( result )); // --------- .this syntax print the returned value in function
// let user = userOperations.getUser(7)
// console.log(user)

// let user = {         // for update shouldnt change ID,balance- (will change this when updating balance of user while doing transactions) , create date & update should be done if something changes in data
//     firstname: 'sarath',
//     lastname: 'Chunchu',
//     email: 'sarath@',
//     address1: '444 st',
//     address2: 'aspin',
//     city: 'bart',
//     state: 'OKC',
//     zipcode: 45577,
//     balance: 0,
//     updateddate: new Date().toJSON().slice(0,18)
// }
// userOperations.updateUser(7,user)


//---------FIND USER-----------
//userOperations.getUser(7).then(user => console.log(user));


//---------FIND USERS----------
//userOperations.getUsers()

//---------SEARCH USER----------
//userOperations.searchUser('pachava')

//-----------------------------------------------------aTRANSACTION OPERATIONS------------------------------------------
//-------DEPOSIT------------

//transactionOperations.deposit(1,500).then(result => console.log(result))

//-------TRANSFER-----------
//transactionOperations.transfer(3,7,500).then(result => console.log(result))

//-------WITHDRAW
//transactionOperations.withdraw(3,100).then(result => console.log(result))

//-------READ TRANSACTIONS
//transactionOperations.readTransactions(7).then(result =>console.log(result))
